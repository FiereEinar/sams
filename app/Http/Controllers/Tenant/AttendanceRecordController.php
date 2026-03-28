<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\AttendanceRecord;
use App\Models\EventSession;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AttendanceRecordController extends Controller
{
    public function store(Request $request, EventSession $session): JsonResponse
    {
        if ($session->status !== 'active') {
            return response()->json(['message' => 'Session is not active.'], 422);
        }

        $validated = $request->validate([
            'student_id_input' => 'required|string|max:255',
            'method' => 'required|in:manual,barcode',
        ]);

        // Check for duplicate in this session
        $existing = AttendanceRecord::where('event_session_id', $session->id)
            ->where('student_id_input', $validated['student_id_input'])
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Student already checked in for this session.',
                'duplicate' => true,
            ], 409);
        }

        // Look up student by student_id
        $student = Student::where('student_id', $validated['student_id_input'])->first();

        $record = AttendanceRecord::create([
            'event_session_id' => $session->id,
            'student_id' => $student?->id,
            'student_id_input' => $validated['student_id_input'],
            'method' => $validated['method'],
            'recorded_at' => now(),
        ]);

        $record->load('student');

        return response()->json([
            'message' => $student ? 'Attendance recorded.' : 'Attendance recorded (student not in masterlist).',
            'record' => $record,
            'found' => (bool) $student,
        ], 201);
    }

    public function index(EventSession $session): JsonResponse
    {
        $records = $session->attendanceRecords()
            ->with('student')
            ->orderByDesc('recorded_at')
            ->get();

        return response()->json([
            'records' => $records,
            'total' => $records->count(),
        ]);
    }
}
