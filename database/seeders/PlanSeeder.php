<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (\App\Models\Plan::count() > 0) {
            return;
        }

        \App\Models\Plan::create([
            'name' => 'Org Basic',
            'type' => 'basic',
            'description' => 'Essential for small interest groups',
            'price' => 0,
            'status' => 'active',
            'is_featured' => false,
            'features' => [
                'max_students_per_import' => 400,
                'max_users' => 3,
                'max_exports_per_day' => 3,
            ],
        ]);

        \App\Models\Plan::create([
            'name' => 'Org Pro',
            'type' => 'premium',
            'description' => 'Comprehensive for major councils',
            'price' => 499,
            'status' => 'active',
            'is_featured' => true,
            'features' => [
                'max_students_per_import' => null,
                'max_users' => null,
                'max_exports_per_day' => null,
            ],
        ]);
    }
}
