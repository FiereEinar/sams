<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $totalTenants = Tenant::count();
        $activeTenants = Tenant::where('status', 'active')->count();
        $inactiveTenants = Tenant::where('status', 'inactive')->count();
        $pendingRequests = Tenant::where('status', 'inactive')->where('plan', 'basic')->count();
        $premiumTenants = Tenant::where('plan', 'premium')->count();
        $basicTenants = Tenant::where('plan', 'basic')->count();

        $recentTenants = Tenant::query()
            ->with('domains')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn (Tenant $tenant) => [
                'id' => $tenant->id,
                'organization_name' => $tenant->organization_name,
                'organization_type' => $tenant->organization_type,
                'plan' => $tenant->plan,
                'status' => $tenant->status,
                'domain' => $tenant->domains->first()?->domain,
                'created_at' => $tenant->created_at->format('M d, Y'),
            ]);

        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'total_tenants' => $totalTenants,
                'active_tenants' => $activeTenants,
                'inactive_tenants' => $inactiveTenants,
                'pending_requests' => $pendingRequests,
                'premium_tenants' => $premiumTenants,
                'basic_tenants' => $basicTenants,
            ],
            'recentTenants' => $recentTenants,
        ]);
    }
}
