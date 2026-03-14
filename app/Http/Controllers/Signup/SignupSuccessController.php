<?php

namespace App\Http\Controllers\Signup;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
            // Already processed or invalid
            return Inertia::render('SignupSuccess', [
                'status' => 'processed',
            ]);
        }

        // DB::beginTransaction();

        try {
            $tenantId = $formData['organization']['subdomain'];

            $tenant = Tenant::create([
                'id' => $tenantId,
                'plan' => 'premium',
                'organization_name' => $formData['organization']['name'],
                'organization_type' => $formData['organization']['type'],
                'status' => 'active',
            ]);

            $tenantDomain = $tenantId.'.'.env('APP_DOMAIN');
            $tenant->domains()->create(['domain' => $tenantDomain]);

            // create the user in their tenant
            $tenant->run(function () use ($formData, $tenant) {
                User::create([
                    'name' => $formData['admin']['fullname'],
                    'email' => $formData['admin']['email'],
                    'password' => Hash::make($formData['admin']['password']),
                    'tenant_id' => $tenant->id,
                ]);
            });

            // DB::commit();

            Cache::forget($cacheKey);

            return Inertia::render('SignupSuccess', [
                'status' => 'success',
                'subdomain' => $tenantDomain,
            ]);
        } catch (\Exception $e) {
            // DB::rollBack();

            return redirect('/signup')->withErrors(['error' => 'Registration failed: '.$e->getMessage()]);
        }
    }
}
