<?php

namespace App\Http\Controllers\Signup;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class BasicSignupController extends Controller
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

        // Clean up code
        Cache::forget('signup_code_'.$email);

        $tenantId = $request->input('organization.subdomain');

        try {
            $tenant = Tenant::create([
                'id' => $tenantId,
                'plan' => 'basic',
                'organization_name' => $request->input('organization.name'),
                'organization_type' => $request->input('organization.type'),
                'status' => 'inactive',
            ]);

            $tenant->domains()->create(['domain' => $tenantId.'.'.env('APP_DOMAIN')]);

            // Create user in their tenant DB
            $tenant->run(function () use ($request, $email, $tenant) {
                User::create([
                    'name' => $request->input('admin.fullname'),
                    'email' => $email,
                    'password' => Hash::make($request->input('admin.password')),
                    'tenant_id' => $tenant->id,
                ]);
            });

            return response()->json([
                'message' => 'Registration successful! Your account is pending admin approval.',
                'redirect' => route('login'),
            ]);
        } catch (\Exception $e) {

            return response()->json(['message' => 'Registration failed: '.$e->getMessage()], 500);
        }
    }
}
