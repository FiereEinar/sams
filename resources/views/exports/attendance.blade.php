<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Attendance Report - {{ $session->name }}</title>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
        .header h1 { margin: 0; font-size: 20px; color: #111; }
        .header p { margin: 5px 0 0; color: #666; font-size: 11px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
        th { background-color: #f8f9fa; font-weight: bold; color: #444; font-size: 11px; text-transform: uppercase; }
        .text-center { text-align: center; }
        .footer { position: fixed; bottom: -20px; left: 0; right: 0; font-size: 10px; color: #888; text-align: center; }
        .page-number:after { content: counter(page); }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ $tenant->organization_name }}</h1>
        <p>Attendance Report for: <strong>{{ $session->name }}</strong> ({{ \Carbon\Carbon::parse($session->started_at)->format('M d, Y') }})</p>
        <p>Generated on {{ now()->format('M d, Y h:i A') }}</p>
    </div>

    <div class="footer">
        Page <span class="page-number"></span>
    </div>

    <table>
        <thead>
            <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Yr/Sec</th>
                <th>Method</th>
                <th>Time In</th>
            </tr>
        </thead>
        <tbody>
            @foreach($records as $record)
                <tr>
                    <td class="text-center">{{ $record->student_id_input }}</td>
                    <td>{{ $record->student ? $record->student->last_name . ', ' . $record->student->first_name : '-' }}</td>
                    <td>{{ $record->student ? $record->student->course : '-' }}</td>
                    <td class="text-center">{{ $record->student ? $record->student->year . $record->student->section : '-' }}</td>
                    <td class="text-center">{{ ucfirst($record->method) }}</td>
                    <td>{{ $record->recorded_at->format('h:i A') }}</td>
                </tr>
            @endforeach
            @if($records->isEmpty())
                <tr>
                    <td colspan="6" class="text-center">No attendance records found.</td>
                </tr>
            @endif
        </tbody>
    </table>
</body>
</html>
