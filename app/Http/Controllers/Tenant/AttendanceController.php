<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\AttendanceRecord;
use App\Models\EventSession;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {
        $activeSessions = EventSession::with('event')
            ->whereIn('status', ['active', 'paused'])
            ->withCount('attendanceRecords')
            ->orderByDesc('updated_at')
            ->get();

        $recentRecords = AttendanceRecord::with(['student', 'session.event'])
            ->orderByDesc('recorded_at')
            ->limit(20)
            ->get();

        $totalRecords = AttendanceRecord::count();
        $totalSessions = EventSession::count();

        return Inertia::render('tenant/Attendance', [
            'activeSessions' => $activeSessions,
            'recentRecords' => $recentRecords,
            'totalRecords' => $totalRecords,
            'totalSessions' => $totalSessions,
        ]);
    }
}
