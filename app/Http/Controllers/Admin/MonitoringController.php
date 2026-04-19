<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class MonitoringController extends Controller
{
    public function index(\Illuminate\Http\Request $request)
    {
        $selectedMonth = $request->query('month', date('Y-m'));

        $totalTenants = \App\Models\Tenant::count();
        $totalStorage = \App\Models\Tenant::sum('storage_occupied') ?? 0;

        $totalApiRequests = \App\Models\TenantMetric::where('month', $selectedMonth)->sum('api_requests_count') ?? 0;
        $totalBandwidth = \App\Models\TenantMetric::where('month', $selectedMonth)->sum('bandwidth_used') ?? 0;

        $tenants = \App\Models\Tenant::with(['domains', 'metrics' => function ($q) use ($selectedMonth) {
            $q->where('month', $selectedMonth);
        }])->orderBy('created_at', 'desc')->get();

        // Map tenants to format them easily
        $tenantsData = $tenants->map(function ($tenant) {
            $metrics = $tenant->metrics->first();

            return [
                'id' => $tenant->id,
                'name' => $tenant->name,
                'organization_name' => $tenant->organization_name,
                'plan' => $tenant->plan,
                'domains' => $tenant->domains,
                'storage_occupied' => $tenant->storage_occupied,
                'api_requests_count' => $metrics ? $metrics->api_requests_count : 0,
                'bandwidth_used' => $metrics ? $metrics->bandwidth_used : 0,
            ];
        });

        // Get all unique available months for the dropdown
        $availableMonths = \App\Models\TenantMetric::select('month')
            ->distinct()
            ->orderBy('month', 'desc')
            ->pluck('month')
            ->toArray();

        if (! in_array(date('Y-m'), $availableMonths)) {
            array_unshift($availableMonths, date('Y-m'));
            $availableMonths = array_unique($availableMonths);
        }

        return \Inertia\Inertia::render('admin/Monitoring', [
            'totalTenants' => $totalTenants,
            'totalStorage' => $totalStorage,
            'totalBandwidth' => $totalBandwidth,
            'totalApiRequests' => $totalApiRequests,
            'tenants' => $tenantsData,
            'selectedMonth' => $selectedMonth,
            'availableMonths' => array_values($availableMonths),
        ]);
    }
}
