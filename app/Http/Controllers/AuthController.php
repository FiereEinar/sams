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
        return Inertia::render('Login');
    }

    public function signupPage()
    {
        return Inertia::render('Signup');
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
            return redirect()->route('admin.requests');
        }

        $tenant = Tenant::find($user->tenant_id);
        $port = env('APP_PORT');

        return redirect()->away("http://{$tenant->domains->first()->domain}:{$port}/dashboard");
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
