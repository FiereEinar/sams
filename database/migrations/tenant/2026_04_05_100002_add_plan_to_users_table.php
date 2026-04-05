<?php

use App\Enums\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('plan')->default('basic')->after('tenant_id');
        });

        // Seed the default Admin role with all permissions
        $adminRole = Role::create([
            'name' => 'Admin',
            'permissions' => Permission::all(),
            'is_default' => true,
        ]);

        // Assign the Admin role to all existing users
        $users = User::all();
        foreach ($users as $user) {
            $user->roles()->attach($adminRole->id);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('plan');
        });
    }
};
