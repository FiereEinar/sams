<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\Tenant;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlanManagementController extends Controller
{
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

        return Inertia::render('tenant/ManagePlan', [
            'plans' => $plans,
            'currentPlan' => $currentPlan,
            'tenantPlan' => $tenant->plan ?? 'basic',
            'paidPlanIds' => $paidPlanIds,
        ]);
    }

    public function checkout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'plan_id' => ['required', 'integer'],
        ]);

        $plan = Plan::on('mysql')->find($validated['plan_id']);

        if (! $plan) {
            return response()->json(['message' => 'Plan not found.'], 404);
        }

        $tenant = tenant();

        // Free plans don't need checkout
        if ((float) $plan->price === 0.0) {
            $this->applyPlanChange($tenant, $plan);

            return response()->json([
                'message' => 'Plan updated successfully.',
                'redirect' => '/plans?upgraded=1',
            ]);
        }

        // Check if tenant has already paid for this plan before
        $alreadyPaid = Payment::on('mysql')->where('tenant_id', $tenant->id)
            ->where('status', 'paid')
            ->where('description', 'LIKE', "%{$plan->name}%")
            ->exists();

        if ($alreadyPaid) {
            $this->applyPlanChange($tenant, $plan);

            return response()->json([
                'message' => 'Plan restored (previously paid).',
                'redirect' => '/plans?upgraded=1',
            ]);
        }

        $checkoutRef = uniqid('plan_');
        cache()->store('file')->put('plan_upgrade_'.$checkoutRef, [
            'tenant_id' => $tenant->id,
            'plan_id' => $plan->id,
            'user_name' => auth()->user()->name,
            'user_email' => auth()->user()->email,
        ], now()->addHours(24));

        $client = new Client;
        $PAYMONGO_SECRET = env('PAYMONGO_SECRET');
        $authKey = base64_encode($PAYMONGO_SECRET.':');

        try {
            $tenantDomain = $tenant->domains->first()->domain ?? request()->getHost();
            $port = env('APP_PORT') ? ':'.env('APP_PORT') : '';
            $successUrl = "http://{$tenantDomain}{$port}/plans/success?ref={$checkoutRef}";

            $response = $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions', [
                'body' => json_encode([
                    'data' => [
                        'attributes' => [
                            'send_email_receipt' => true,
                            'show_description' => true,
                            'show_line_items' => true,
                            'description' => $plan->name.' Plan Upgrade',
                            'success_url' => $successUrl,
                            'line_items' => [[
                                'currency' => 'PHP',
                                'amount' => (int) ($plan->price * 100),
                                'name' => $plan->name,
                                'quantity' => 1,
                            ]],
                            'payment_method_types' => ['gcash', 'paymaya', 'card'],
                        ],
                    ],
                ]),
                'headers' => [
                    'Content-Type' => 'application/json',
                    'accept' => 'application/json',
                    'Authorization' => "Basic {$authKey}",
                ],
                'verify' => false,
            ]);

            $body = json_decode((string) $response->getBody(), true);
            $checkoutUrl = $body['data']['attributes']['checkout_url'];

            return response()->json([
                'message' => 'Redirecting to payment gateway...',
                'checkout_url' => $checkoutUrl,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to initialize checkout: '.$e->getMessage()], 500);
        }
    }

    public function success(Request $request): Response
    {
        $ref = $request->query('ref');

        if (! $ref) {
            return Inertia::render('tenant/PlanUpgradeSuccess', ['status' => 'error']);
        }

        $cacheKey = 'plan_upgrade_'.$ref;
        $data = cache()->store('file')->get($cacheKey);

        if (! $data) {
            return Inertia::render('tenant/PlanUpgradeSuccess', ['status' => 'processed']);
        }

        try {
            $tenant = Tenant::find($data['tenant_id']);
            $plan = Plan::on('mysql')->find($data['plan_id']);

            if (! $tenant || ! $plan) {
                return Inertia::render('tenant/PlanUpgradeSuccess', ['status' => 'error']);
            }

            $this->applyPlanChange($tenant, $plan);

            Payment::on('mysql')->create([
                'tenant_id' => $tenant->id,
                'payer_name' => $data['user_name'],
                'payer_email' => $data['user_email'],
                'amount' => (int) ($plan->price * 100),
                'currency' => 'PHP',
                'description' => $plan->name.' Plan Upgrade',
                'checkout_ref' => $ref,
                'status' => 'paid',
            ]);

            cache()->store('file')->forget($cacheKey);

            return Inertia::render('tenant/PlanUpgradeSuccess', [
                'status' => 'success',
                'planName' => $plan->name,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('tenant/PlanUpgradeSuccess', ['status' => 'error']);
        }
    }

    private function applyPlanChange(Tenant $tenant, Plan $plan): void
    {
        $tenant->update([
            'plan' => $plan->type,
            'plan_id' => $plan->id,
        ]);
    }
}
