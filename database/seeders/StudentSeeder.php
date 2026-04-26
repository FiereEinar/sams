<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Seed 5 sample students into the tenant database.
     */
    public function run(): void
    {
        $students = [
            ['student_id' => '2026-0001', 'last_name' => 'Dela Cruz', 'first_name' => 'Juan', 'middle_name' => 'Santos', 'sex' => 'Male', 'course' => 'BSIT', 'year' => '3', 'section' => 'A'],
            ['student_id' => '2026-0002', 'last_name' => 'Reyes', 'first_name' => 'Maria', 'middle_name' => 'Lopez', 'sex' => 'Female', 'course' => 'BSCS', 'year' => '2', 'section' => 'B'],
            ['student_id' => '2026-0003', 'last_name' => 'Garcia', 'first_name' => 'Carlos', 'middle_name' => null, 'sex' => 'Male', 'course' => 'BSIT', 'year' => '1', 'section' => 'A'],
            ['student_id' => '2026-0004', 'last_name' => 'Santos', 'first_name' => 'Angela', 'middle_name' => 'Ramos', 'sex' => 'Female', 'course' => 'BSIS', 'year' => '4', 'section' => 'C'],
            ['student_id' => '2026-0005', 'last_name' => 'Bautista', 'first_name' => 'Mark', 'middle_name' => 'Torres', 'sex' => 'Male', 'course' => 'BSCS', 'year' => '2', 'section' => 'A'],
        ];

        foreach ($students as $student) {
            Student::firstOrCreate(
                ['student_id' => $student['student_id']],
                $student
            );
        }
    }
}
