<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (\App\Models\Module::count() > 0) {
            return;
        }

        \App\Models\Module::factory(50)->create();
    }
}
