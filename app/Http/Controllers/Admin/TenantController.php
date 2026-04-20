<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\SubscriptionNotificationMail;
use App\Models\Payment;
use App\Models\Tenant;
use Illuminate\Support\Facades\Mail;
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
                // Compute subscription expiration date (1 year from signup/latest payment)
                $latestPayment = Payment::where('tenant_id', $tenant->id)->where('status', 'paid')->latest()->first();
                $baseDate = $latestPayment ? $latestPayment->created_at : $tenant->created_at;
                $expiresAt = $baseDate->copy()->addYear()->format('M d, Y');

                return [
                    'id' => $tenant->id,
                    'organization_name' => $tenant->organization_name,
                    'organization_type' => $tenant->organization_type,
                    'plan' => $tenant->plan,
                    'plan_id' => $tenant->plan_id,
                    'status' => $tenant->status,
                    'address' => $tenant->address,
                    'name' => $tenant->name,
                    'email' => $tenant->email,
                    'domain' => $tenant->domains->first()?->domain,
                    'created_at' => $tenant->created_at->format('M d, Y'),
                    'subscription_expires_at' => $expiresAt,
                ];
            });

        $plans = \App\Models\Plan::where('status', 'active')->get();

        return Inertia::render('admin/Tenants', [
            'tenants' => $tenants,
            'plans' => $plans,
        ]);
    }

    public function toggleStatus(Tenant $tenant): \Illuminate\Http\RedirectResponse
    {
        $newStatus = $tenant->status === 'active' ? 'inactive' : 'active';
        $tenant->update(['status' => $newStatus]);

        return redirect()->back()->with('success', "Tenant '{$tenant->organization_name}' is now {$newStatus}.");
    }

    public function notifySubscription(Tenant $tenant): \Illuminate\Http\RedirectResponse
    {
        $latestPayment = Payment::where('tenant_id', $tenant->id)->where('status', 'paid')->latest()->first();
        $baseDate = $latestPayment ? $latestPayment->created_at : $tenant->created_at;
        $expiresAt = $baseDate->copy()->addYear()->format('M d, Y');

        Mail::to($tenant->email)->send(new SubscriptionNotificationMail(
            tenantName: $tenant->organization_name,
            plan: $tenant->plan,
            expirationDate: $expiresAt
        ));

        return redirect()->back()->with('success', "Subscription notification dispatched to {$tenant->organization_name}.");
    }

    public function updatePlan(\Illuminate\Http\Request $request, Tenant $tenant): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'plan_id' => ['required', 'exists:plans,id'],
        ]);

        $plan = \App\Models\Plan::findOrFail($validated['plan_id']);

        $tenant->update([
            'plan_id' => $plan->id,
            'plan' => $plan->type,
        ]);

        return redirect()->back()->with('success', "Tenant plan successfully updated to {$plan->name}.");
    }
}
