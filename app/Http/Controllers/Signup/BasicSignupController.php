<?php

namespace App\Http\Controllers\Signup;

use App\Http\Controllers\Controller;
use App\Models\Plan;
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

        // Clean up code
        Cache::forget('signup_code_'.$email);

        $tenantId = $request->input('organization.subdomain');

        // Resolve actual plan
        $plan = Plan::find($request->input('plan_id'));
        $planType = $plan?->type ?? 'basic';

        try {
            $tenant = Tenant::create([
                'id' => $tenantId,
                'plan' => $planType,
                'organization_name' => $request->input('organization.name'),
                'organization_type' => $request->input('organization.type'),
                'name' => $request->input('admin.fullname'),
                'email' => $request->input('admin.email'),
                'address' => $request->input('organization.address'),
                'status' => 'inactive',
            ]);

            $tenant->domains()->create(['domain' => $tenantId.'.'.env('APP_DOMAIN')]);

            // Create user in their tenant DB
            $tenant->run(function () use ($request, $email, $tenant) {
                $user = User::create([
                    'name' => $request->input('admin.fullname'),
                    'email' => $email,
                    'password' => Hash::make($request->input('admin.password')),
                    'tenant_id' => $tenant->id,
                ]);

                $role = \App\Models\Role::firstOrCreate(
                    ['name' => 'Admin'],
                    [
                        'permissions' => \App\Enums\Permission::all(),
                        'is_default' => false,
                    ]
                );

                $user->roles()->attach($role);
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
