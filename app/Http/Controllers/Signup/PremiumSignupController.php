<?php

namespace App\Http\Controllers\Signup;

use App\Http\Controllers\Controller;
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

        // Put the form data into cache to be processed after successful payment
        $checkoutRef = uniqid('chk_');
        Cache::put('premium_signup_'.$checkoutRef, $request->all(), now()->addHours(24));

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
                            'description' => 'Premium Plan Subscription',
                            'success_url' => config('app.url').'/signup/success?ref='.$checkoutRef,
                            'line_items' => [[
                                'currency' => 'PHP',
                                'amount' => 50000, // example amount in centavos
                                'name' => 'Premium Plan',
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
