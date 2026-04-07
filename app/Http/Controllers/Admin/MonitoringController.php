<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MonitoringController extends Controller
{
    public function index()
    {
        $totalTenants = \App\Models\Tenant::count();
        $totalStorage = \App\Models\Tenant::sum('storage_occupied') ?? 0;
        $totalBandwidth = \App\Models\Tenant::sum('bandwidth_used') ?? 0;
        $totalApiRequests = \App\Models\Tenant::sum('api_requests_count') ?? 0;

        $tenants = \App\Models\Tenant::with('domains')
            ->orderBy('created_at', 'desc')
            ->get();

        return \Inertia\Inertia::render('admin/Monitoring', [
            'totalTenants' => $totalTenants,
            'totalStorage' => $totalStorage,
            'totalBandwidth' => $totalBandwidth,
            'totalApiRequests' => $totalApiRequests,
            'tenants' => $tenants,
        ]);
    }
}
