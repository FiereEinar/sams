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
        // central app user
        User::factory()->create([
            'name' => 'Nick Mours',
            'email' => 'nickxylanmelloria@gmail.com',
            'password' => '123123',
        ]);


        $tenant = Tenant::query()->create([
            'id' => 'sbo',
        ]);

        $tenant->domains()->create([
            'domain' => 'sbo.localhost',
        ]);

        // tenant
        tenancy()->initialize($tenant);
        User::factory()->create([
            'name' => 'Lester Ybanez',
            'email' => 'lester@gmail.com',
            'password' => '123123',
            'tenant_id' => $tenant->id,
        ]);
        tenancy()->end();
    }
}
