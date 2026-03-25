<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImportMasterlistRequest;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MasterlistImportController extends Controller
{
    /**
     * Column name aliases for auto-detection.
     * Maps each DB column to an array of possible header names (case-insensitive).
     *
     * @var array<string, array<string>>
     */
    private const COLUMN_ALIASES = [
        'student_id' => [
            'student id', 'studentid', 'school id', 'schoolid',
            'id number', 'id no', 'student no', 'student number',
            'stud id', 'studid', 'student_id', 'school_id',
            'id_number', 'student_no', 'student_number',
        ],
        'last_name' => [
            'last name', 'lastname', 'surname', 'family name',
            'l.name', 'lname', 'last_name', 'family_name',
        ],
        'first_name' => [
            'first name', 'firstname', 'given name', 'f.name',
            'fname', 'first_name', 'given_name',
        ],
        'middle_name' => [
            'middle name', 'middlename', 'm.name', 'mi',
            'mname', 'middle_name', 'middle initial',
        ],
        'sex' => ['sex', 'gender'],
        'course' => ['course', 'program', 'degree'],
        'year' => ['year', 'year level', 'year_level', 'yr'],
        'units' => ['units', 'total units', 'total_units'],
        'section' => ['section', 'sec'],
    ];

    /**
     * Parse an uploaded file and return a preview of the import.
     */
    public function preview(ImportMasterlistRequest $request): JsonResponse
    {
        $tenant = tenant();
        $isBasic = ($tenant->plan ?? 'basic') === 'basic';

        if ($isBasic && $tenant->last_masterlist_import_at) {
            $lastImport = \Carbon\Carbon::parse($tenant->last_masterlist_import_at);
            if (now()->diffInHours($lastImport) < 24) {
                return response()->json([
                    'error' => 'Your basic plan allows one import per day. Please try again tomorrow.',
                ], 422);
            }
        }

        $file = $request->file('file');
        $rawData = Excel::toArray(null, $file);

        if (empty($rawData) || empty($rawData[0]) || count($rawData[0]) < 2) {
            return response()->json([
                'error' => 'The file appears to be empty or has no data rows.',
            ], 422);
        }

        $sheet = $rawData[0];
        $headers = array_map(fn ($h) => trim((string) $h), $sheet[0]);

        $columnMap = $this->detectColumns($headers);

        if (! isset($columnMap['student_id']) || ! isset($columnMap['last_name']) || ! isset($columnMap['first_name'])) {
            $missing = [];
            if (! isset($columnMap['student_id'])) {
                $missing[] = 'Student ID';
            }
            if (! isset($columnMap['last_name'])) {
                $missing[] = 'Last Name';
            }
            if (! isset($columnMap['first_name'])) {
                $missing[] = 'First Name';
            }

            return response()->json([
                'error' => 'Could not detect required columns: '.implode(', ', $missing).'. Please check your file headers.',
            ], 422);
        }

        $existingIds = Student::pluck('student_id')->map(fn ($id) => strtolower(trim((string) $id)))->toArray();

        $rows = [];
        $summary = ['valid' => 0, 'invalid' => 0, 'duplicate' => 0];

        for ($i = 1; $i < count($sheet); $i++) {
            $raw = $sheet[$i];

            $row = $this->mapRow($raw, $columnMap, $headers);

            if ($this->isEmptyRow($row)) {
                continue;
            }

            $row = $this->cleanRow($row);

            $status = $this->validateRow($row, $existingIds, $rows);

            $rows[] = [
                'data' => $row,
                'status' => $status,
                'row_number' => $i + 1,
            ];

            $summary[$status]++;
        }

        if ($isBasic && $summary['valid'] > 500) {
            return response()->json([
                'error' => 'Your basic plan allows a maximum of 500 students per import. This file contains '.$summary['valid'].' valid rows. Please upgrade to Premium or reduce your file size.',
            ], 422);
        }

        return response()->json([
            'columns' => $columnMap,
            'detected_headers' => $this->getDetectedHeaders($columnMap),
            'rows' => $rows,
            'summary' => $summary,
        ]);
    }

    /**
     * Store the validated import rows into the database.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'rows' => ['required', 'array', 'min:1'],
            'rows.*.student_id' => ['required', 'string'],
            'rows.*.last_name' => ['required', 'string'],
            'rows.*.first_name' => ['required', 'string'],
            'rows.*.middle_name' => ['nullable', 'string'],
            'rows.*.sex' => ['nullable', 'string'],
            'rows.*.course' => ['nullable', 'string'],
            'rows.*.year' => ['nullable', 'string'],
            'rows.*.units' => ['nullable', 'string'],
            'rows.*.section' => ['nullable', 'string'],
        ]);

        $tenant = tenant();
        $isBasic = ($tenant->plan ?? 'basic') === 'basic';
        $rows = $request->input('rows');

        if ($isBasic) {
            if ($tenant->last_masterlist_import_at && now()->diffInHours(\Carbon\Carbon::parse($tenant->last_masterlist_import_at)) < 24) {
                return response()->json(['message' => 'Your basic plan allows one import per day.'], 422);
            }
            if (count($rows) > 500) {
                return response()->json(['message' => 'Maximum 500 students per import.'], 422);
            }
        }

        $imported = 0;
        $skipped = 0;

        foreach ($rows as $row) {
            $exists = Student::where('student_id', $row['student_id'])->exists();

            if ($exists) {
                $skipped++;

                continue;
            }

            Student::create([
                'student_id' => $row['student_id'],
                'last_name' => $row['last_name'],
                'first_name' => $row['first_name'],
                'middle_name' => $row['middle_name'] ?? null,
                'sex' => $row['sex'] ?? null,
                'course' => $row['course'] ?? null,
                'year' => $row['year'] ?? null,
                'units' => $row['units'] ?? null,
                'section' => $row['section'] ?? null,
            ]);

            $imported++;
        }

        if ($isBasic) {
            $tenant->update(['last_masterlist_import_at' => now()->toDateTimeString()]);
        }

        return response()->json([
            'message' => "Successfully imported {$imported} students.",
            'imported' => $imported,
            'skipped' => $skipped,
        ]);
    }

    /**
     * Download a CSV template with guaranteed-detectable headers.
     */
    public function downloadTemplate(): StreamedResponse
    {
        $headers = ['Student ID', 'Last Name', 'First Name', 'Middle Name', 'Sex', 'Course', 'Year', 'Units', 'Section'];

        return response()->streamDownload(function () use ($headers) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, $headers);
            fclose($handle);
        }, 'masterlist_template.csv', [
            'Content-Type' => 'text/csv',
        ]);
    }

    /**
     * Auto-detect column positions from the header row.
     *
     * @param  array<string>  $headers
     * @return array<string, int>
     */
    private function detectColumns(array $headers): array
    {
        $columnMap = [];

        foreach ($headers as $index => $header) {
            $normalized = strtolower(trim(preg_replace('/[\s_\-\.]+/', ' ', $header)));

            foreach (self::COLUMN_ALIASES as $column => $aliases) {
                if (isset($columnMap[$column])) {
                    continue;
                }

                foreach ($aliases as $alias) {
                    if ($normalized === $alias || $normalized === str_replace('_', ' ', $alias)) {
                        $columnMap[$column] = $index;

                        break 2;
                    }
                }
            }
        }

        return $columnMap;
    }

    /**
     * Map a raw row array to named columns.
     *
     * @param  array<mixed>  $raw
     * @param  array<string, int>  $columnMap
     * @param  array<string>  $headers
     * @return array<string, string|null>
     */
    private function mapRow(array $raw, array $columnMap, array $headers): array
    {
        $row = [];

        foreach ($columnMap as $column => $index) {
            $row[$column] = isset($raw[$index]) ? (string) $raw[$index] : null;
        }

        return $row;
    }

    /**
     * Clean a row by removing asterisks and trimming whitespace.
     *
     * @param  array<string, string|null>  $row
     * @return array<string, string|null>
     */
    private function cleanRow(array $row): array
    {
        return array_map(function ($value) {
            if ($value === null) {
                return null;
            }

            $value = str_replace('*', '', $value);
            $value = trim($value);

            return $value === '' ? null : $value;
        }, $row);
    }

    /**
     * Check if a row is completely empty.
     *
     * @param  array<string, string|null>  $row
     */
    private function isEmptyRow(array $row): bool
    {
        foreach ($row as $value) {
            if ($value !== null && trim((string) $value) !== '') {
                return false;
            }
        }

        return true;
    }

    /**
     * Validate a row and return its status.
     *
     * @param  array<string, string|null>  $row
     * @param  array<string>  $existingIds
     * @param  array<array{data: array<string, string|null>, status: string}>  $previousRows
     */
    private function validateRow(array $row, array $existingIds, array $previousRows): string
    {
        if (empty($row['student_id']) || empty($row['last_name']) || empty($row['first_name'])) {
            return 'invalid';
        }

        $normalizedId = strtolower(trim($row['student_id']));

        if (in_array($normalizedId, $existingIds)) {
            return 'duplicate';
        }

        foreach ($previousRows as $prev) {
            if (strtolower(trim($prev['data']['student_id'] ?? '')) === $normalizedId) {
                return 'duplicate';
            }
        }

        return 'valid';
    }

    /**
     * Get friendly detected header names for display.
     *
     * @param  array<string, int>  $columnMap
     * @return array<string, string>
     */
    private function getDetectedHeaders(array $columnMap): array
    {
        $friendlyNames = [
            'student_id' => 'Student ID',
            'last_name' => 'Last Name',
            'first_name' => 'First Name',
            'middle_name' => 'Middle Name',
            'sex' => 'Sex',
            'course' => 'Course',
            'year' => 'Year',
            'units' => 'Units',
            'section' => 'Section',
        ];

        $result = [];
        foreach ($columnMap as $column => $index) {
            $result[$column] = $friendlyNames[$column] ?? $column;
        }

        return $result;
    }
}
