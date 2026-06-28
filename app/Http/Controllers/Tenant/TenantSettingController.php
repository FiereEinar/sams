<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\TenantSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Plan;
use App\Models\Payment;

class TenantSettingController extends Controller
{
    private const ALLOWED_KEYS = [
        'theme_mode',
        'accent_color',
        'layout_sidebar_position',
        'layout_topbar_visibility',
        'layout_topbar_menu',
        'layout_sidebar_collapsed',
        'sidebar_logo_type',
        'sidebar_logo_icon',
        'sidebar_name',
    ];

    public function index(): Response
    {
        $tenant = tenant();
        $plans = Plan::on('mysql')
            ->where('status', 'active')
            ->orderBy('price', 'asc')
            ->get();

        $currentPlan = null;
        if (isset($tenant->plan_id)) {
            $currentPlan = Plan::on('mysql')->find($tenant->plan_id);
        }
        if (! $currentPlan) {
            $currentPlan = Plan::on('mysql')
                ->where('type', $tenant->plan ?? 'basic')
                ->where('status', 'active')
                ->first();
        }

        $paidPlanNames = Payment::on('mysql')
            ->where('tenant_id', $tenant->id)
            ->where('status', 'paid')
            ->pluck('description')
            ->toArray();

        $paidPlanIds = $plans->filter(function (Plan $plan) use ($paidPlanNames): bool {
            foreach ($paidPlanNames as $desc) {
                if (str_contains((string) $desc, $plan->name)) {
                    return true;
                }
            }

            return false;
        })->pluck('id')->values()->all();

        return Inertia::render('tenant/Settings', [
            'plans' => $plans,
            'currentPlan' => $currentPlan,
            'tenantPlan' => $tenant->plan ?? 'basic',
            'paidPlanIds' => $paidPlanIds,
        ]);
    }

    public function update(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'key' => ['required', 'string', 'in:'.implode(',', self::ALLOWED_KEYS)],
            'value' => ['nullable', 'string', 'max:255'],
        ]);

        TenantSetting::setSetting($validated['key'], $validated['value']);

        return back();
    }

    public function updateUniversity(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'university' => ['required', 'string', 'max:255'],
        ]);

        $tenant = tenant();
        $tenant->university = $validated['university'];
        $tenant->save();

        return back();
    }

    public function updateBranding(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'logo' => ['required', 'image', 'max:2048'],
        ]);

        $path = $request->file('logo')->store('branding', 'public');

        TenantSetting::setSetting('sidebar_logo_image', '/tenancy/assets/'.$path);

        return back();
    }
}
