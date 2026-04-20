<?php

namespace App\Http\Controllers\Signup;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PremiumSignupController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'organization.name' => 'required|string',
            'organization.type' => 'required|string',
            'organization.subdomain' => 'required|string|regex:/^[a-z0-9]+(-[a-z0-9]+)*$/',
            'organization.address' => 'required|string',
            'admin.fullname' => 'required|string',
            'admin.email' => 'required|email',
            'admin.password' => 'required|string|min:8',
            'verification_code' => 'required|string|size:6',
        ]);

        $email = $request->input('admin.email');
        $code = $request->input('verification_code');
        $cachedCode = Cache::get('signup_code_'.$email);

        if (! $cachedCode || $cachedCode !== $code) {
            return response()->json(['message' => 'Invalid or expired verification code.'], 400);
        }

        // Keep the code in cache for now, or just consume it since checkout is pending.
        Cache::forget('signup_code_'.$email);

        // Look up the actual plan
        $planId = $request->input('plan_id');
        $plan = Plan::find($planId);

        if (! $plan) {
            return response()->json(['message' => 'Selected plan not found.'], 400);
        }

        // Put the form data into cache to be processed after successful payment
        $checkoutRef = uniqid('chk_');
        $cacheData = $request->all();
        $cacheData['resolved_plan_id'] = $plan->id;
        Cache::put('premium_signup_'.$checkoutRef, $cacheData, now()->addHours(24));

        $client = new Client;
        $PAYMONGO_SECRET = env('PAYMONGO_SECRET');
        $authKey = base64_encode($PAYMONGO_SECRET.':');

        try {
            // Note: Since you asked to generate a checkout link, we create it here.
            $response = $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions', [
                'body' => json_encode([
                    'data' => [
                        'attributes' => [
                            'send_email_receipt' => true,
                            'show_description' => true,
                            'show_line_items' => true,
                            'description' => $plan->name.' Subscription',
                            'success_url' => config('app.url').'/signup/success?ref='.$checkoutRef,
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

            $body = json_decode($response->getBody(), true);
            $checkoutUrl = $body['data']['attributes']['checkout_url'];

            return response()->json([
                'message' => 'Redirecting to payment gateway...',
                'checkout_url' => $checkoutUrl,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to initialize checkout: '.$e->getMessage()], 500);
        }
    }
}
