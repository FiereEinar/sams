<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::with('roles')->get();
        $roles = Role::all();
        $tenantPlan = tenant('plan') ?? 'basic';
        $userCount = User::count();
        $maxUsers = $tenantPlan === 'premium' ? null : 3;

        return Inertia::render('tenant/Users', [
            'users' => $users,
            'roles' => $roles,
            'tenantPlan' => $tenantPlan,
            'userCount' => $userCount,
            'maxUsers' => $maxUsers,
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $tenantPlan = tenant('plan') ?? 'basic';
        $userCount = User::count();
        $maxUsers = $tenantPlan === 'premium' ? PHP_INT_MAX : 3;

        if ($userCount >= $maxUsers) {
            return back()->withErrors(['limit' => "User limit reached for {$tenantPlan} plan. Upgrade to add more users."]);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role_ids' => ['required', 'array', 'min:1'],
            'role_ids.*' => ['exists:roles,id'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'tenant_id' => tenant('id'),
            'plan' => $tenantPlan,
        ]);

        $user->roles()->sync($validated['role_ids']);

        return back();
    }

    public function update(Request $request, User $user): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email,'.$user->id],
            'password' => ['nullable', 'string', 'min:8'],
            'role_ids' => ['required', 'array', 'min:1'],
            'role_ids.*' => ['exists:roles,id'],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            ...(! empty($validated['password']) ? ['password' => Hash::make($validated['password'])] : []),
        ]);

        $user->roles()->sync($validated['role_ids']);

        return back();
    }

    public function destroy(Request $request, User $user): \Illuminate\Http\RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->withErrors(['delete' => 'You cannot delete your own account.']);
        }

        $user->delete();

        return back();
    }
}
