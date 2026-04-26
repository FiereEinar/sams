<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Central user
        User::updateOrCreate(
            ['email' => 'nickxylanmelloria@gmail.com'],
            [
                'name' => 'Nick Mours',
                'password' => bcrypt('123123'),
            ]
        );

        $this->call(PlanSeeder::class);

        // Tenant
        $tenant = Tenant::firstOrCreate(
            ['id' => 'sbo'],
            [
                'plan' => 'premium',
                'organization_name' => 'SBO',
                'organization_type' => 'School',
                'status' => 'active',
            ]
        );

        // Domain (avoid duplicates)
        $tenant->domains()->firstOrCreate([
            'domain' => 'sbo.' . env('APP_DOMAIN'),
        ]);

        // Tenant user
        tenancy()->initialize($tenant);

        User::updateOrCreate(
            ['email' => 'lester@gmail.com'],
            [
                'name' => 'Lester Ybanez',
                'password' => bcrypt('123123'),
                'tenant_id' => $tenant->id,
            ]
        );

        tenancy()->end();
    }
}
