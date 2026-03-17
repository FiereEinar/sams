<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ApprovalMail;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class TenantRequestController extends Controller
{
    public function index()
    {
        $requests = Tenant::query()
            ->where('status', 'inactive')
            ->where('plan', 'basic')
            ->with('domains')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function (Tenant $tenant) {
                $adminEmail = null;

                try {
                    $tenant->run(function () use (&$adminEmail) {
                        $user = User::first();
                        $adminEmail = $user?->email;
                    });
                } catch (\Exception $e) {
                    // Tenant DB might not be accessible
                }

                return [
                    'id' => $tenant->id,
                    'organization_name' => $tenant->organization_name,
                    'organization_type' => $tenant->organization_type,
                    'domain' => $tenant->domains->first()?->domain,
                    'admin_email' => $adminEmail,
                    'created_at' => $tenant->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('admin/Requests', [
            'requests' => $requests,
        ]);
    }

    public function approve(Tenant $tenant): \Illuminate\Http\RedirectResponse
    {
        $tenant->update(['status' => 'active']);

        $domain = $tenant->domains->first()?->domain;
        $port = env('APP_PORT');
        $loginUrl = "http://{$domain}:{$port}/login";

        // Get admin email from tenant DB
        $tenant->run(function () use ($loginUrl, $tenant) {
            $user = User::first();
            if ($user) {
                Mail::to($user->email)->send(new ApprovalMail(
                    organizationName: $tenant->organization_name,
                    loginUrl: $loginUrl,
                ));
            }
        });

        return redirect()->back()->with('success', "Tenant '{$tenant->organization_name}' has been approved.");
    }

    public function reject(Tenant $tenant): \Illuminate\Http\RedirectResponse
    {
        $tenantName = $tenant->organization_name;
        $tenant->delete();

        return redirect()->back()->with('success', "Tenant '{$tenantName}' has been rejected and removed.");
    }
}
