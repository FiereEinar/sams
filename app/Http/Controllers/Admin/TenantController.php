<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::query()
            ->with('domains')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function (Tenant $tenant) {
                return [
                    'id' => $tenant->id,
                    'organization_name' => $tenant->organization_name,
                    'organization_type' => $tenant->organization_type,
                    'plan' => $tenant->plan,
                    'status' => $tenant->status,
                    'domain' => $tenant->domains->first()?->domain,
                    'created_at' => $tenant->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('admin/Tenants', [
            'tenants' => $tenants,
        ]);
    }

    public function toggleStatus(Tenant $tenant): \Illuminate\Http\RedirectResponse
    {
        $newStatus = $tenant->status === 'active' ? 'inactive' : 'active';
        $tenant->update(['status' => $newStatus]);

        return redirect()->back()->with('success', "Tenant '{$tenant->organization_name}' is now {$newStatus}.");
    }
}
