<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TenantDatabaseSeeder extends Seeder
{
    /**
     * Seed the tenant database.
     *
     * This seeder runs within each tenant's database context.
     * Only add tenant-safe seeders here (no central models like Tenant or Plan).
     */
    public function run(): void
    {
        // Add tenant-specific seeders here as needed.
        // Example: $this->call(DefaultRoleSeeder::class);
    }
}
