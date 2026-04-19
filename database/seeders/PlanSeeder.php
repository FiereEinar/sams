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
        \App\Models\Plan::create([
            'name' => 'Org Basic',
            'type' => 'basic',
            'description' => 'Essential for small interest groups',
            'price' => 0,
            'status' => 'active',
            'is_featured' => false,
        ]);

        \App\Models\Plan::create([
            'name' => 'Org Pro',
            'type' => 'premium',
            'description' => 'Comprehensive for major councils',
            'price' => 499,
            'status' => 'active',
            'is_featured' => true,
        ]);
    }
}
