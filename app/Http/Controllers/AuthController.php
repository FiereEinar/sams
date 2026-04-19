<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function loginPage()
    {
        $tenant = tenant();

        return Inertia::render('Login', compact('tenant'));
    }

    public function signupPage(Request $request)
    {
        return Inertia::render('Signup', [
            'plan_id' => $request->query('plan_id'),
        ]);
    }

    public function login(Request $request)
    {
        $body = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (! Auth::attempt($body)) {
            return back()->withErrors(['email' => 'Incorrect credentials'])->withInput();
        }

        $request->session()->regenerate();
        $user = Auth::user();

        if (! $user->tenant_id) {
            return redirect()->route('admin.dashboard');
        }

        $tenant = Tenant::find($user->tenant_id);

        if ($tenant && $tenant->email === $user->email) {
            $adminRole = \App\Models\Role::firstOrCreate(
                ['name' => 'Admin'],
                [
                    'permissions' => \App\Enums\Permission::all(),
                    'is_default' => false,
                ]
            );
            
            // Self-heal: update Admin role with all permissions to ensure new permissions are captured.
            $adminRole->update(['permissions' => \App\Enums\Permission::all()]);

            $user->roles()->syncWithoutDetaching([$adminRole->id]);
        }

        if (tenant()) {
            return redirect()->intended('/dashboard');
        }

        $port = env('APP_PORT') ? ':' . env('APP_PORT') : '';
        return redirect()->away("http://{$tenant->domains->first()->domain}{$port}/dashboard");
    }

    public function signup() {}

    public function logout()
    {
        auth()->guard('web')->logout();
        // If tenant domain → redirect to tenant login
        if (tenant()) {
            return redirect()->route('tenant-login');
        }

        // Otherwise → central login
        return redirect()->route('login');
    }
}
