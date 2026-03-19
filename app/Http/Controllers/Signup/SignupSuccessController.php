<?php

namespace App\Http\Controllers\Signup;

use App\Http\Controllers\Controller;
use App\Mail\WelcomeMail;
use App\Models\Payment;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class SignupSuccessController extends Controller
{
    public function __invoke(Request $request)
    {
        $ref = $request->query('ref');

        if (! $ref) {
            return redirect('/');
        }

        $cacheKey = 'premium_signup_'.$ref;
        $formData = Cache::get($cacheKey);

        if (! $formData) {
            return Inertia::render('SignupSuccess', [
                'status' => 'processed',
            ]);
        }

        try {
            $tenantId = $formData['organization']['subdomain'];

            $tenant = Tenant::create([
                'id' => $tenantId,
                'plan' => 'premium',
                'organization_name' => $formData['organization']['name'],
                'organization_type' => $formData['organization']['type'],
                'name' => $formData['admin']['fullname'],
                'email' => $formData['admin']['email'],
                'address' => $formData['organization']['address'] ?? '',
                'status' => 'active',
            ]);

            $tenantDomain = $tenantId.'.'.env('APP_DOMAIN');
            $tenant->domains()->create(['domain' => $tenantDomain]);

            // Create user in their tenant DB
            $tenant->run(function () use ($formData, $tenant) {
                User::create([
                    'name' => $formData['admin']['fullname'],
                    'email' => $formData['admin']['email'],
                    'password' => Hash::make($formData['admin']['password']),
                    'tenant_id' => $tenant->id,
                ]);
            });

            // Record the payment
            Payment::create([
                'tenant_id' => $tenant->id,
                'payer_name' => $formData['admin']['fullname'],
                'payer_email' => $formData['admin']['email'],
                'amount' => 50000, // matches the checkout line_items amount
                'currency' => 'PHP',
                'description' => 'Premium Plan Subscription',
                'checkout_ref' => $ref,
                'status' => 'paid',
            ]);

            // Send welcome email
            $port = env('APP_PORT');
            $loginUrl = "http://{$tenantDomain}:{$port}/login";

            Mail::to($tenant->email)->send(new WelcomeMail(
                organizationName: $tenant->organization_name,
                loginUrl: $loginUrl,
                plan: 'premium',
            ));

            Cache::forget($cacheKey);

            return Inertia::render('SignupSuccess', [
                'status' => 'success',
                'subdomain' => $tenantDomain,
            ]);
        } catch (\Exception $e) {
            return redirect('/signup')->withErrors(['error' => 'Registration failed: '.$e->getMessage()]);
        }
    }
}
