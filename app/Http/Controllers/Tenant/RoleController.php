<?php

namespace App\Http\Controllers\Tenant;

use App\Enums\Permission;
use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function index(): Response
    {
        $roles = Role::withCount('users')->get();
        $permissionsGrouped = Permission::grouped();

        return Inertia::render('tenant/Roles', [
            'roles' => $roles,
            'permissionsGrouped' => $permissionsGrouped,
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
            'permissions' => ['required', 'array', 'min:1'],
            'permissions.*' => ['string', 'in:'.implode(',', Permission::all())],
        ]);

        Role::create([
            'name' => $validated['name'],
            'permissions' => $validated['permissions'],
        ]);

        return back();
    }

    public function update(Request $request, Role $role): \Illuminate\Http\RedirectResponse
    {
        if ($role->is_default) {
            return back()->withErrors(['role' => 'The Admin role cannot be modified.']);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name,'.$role->id],
            'permissions' => ['required', 'array', 'min:1'],
            'permissions.*' => ['string', 'in:'.implode(',', Permission::all())],
        ]);

        $role->update([
            'name' => $validated['name'],
            'permissions' => $validated['permissions'],
        ]);

        return back();
    }

    public function destroy(Role $role): \Illuminate\Http\RedirectResponse
    {
        if ($role->is_default) {
            return back()->withErrors(['role' => 'The Admin role cannot be deleted.']);
        }

        if ($role->users()->count() > 0) {
            return back()->withErrors(['role' => 'Cannot delete a role that has users assigned. Reassign users first.']);
        }

        $role->delete();

        return back();
    }
}
