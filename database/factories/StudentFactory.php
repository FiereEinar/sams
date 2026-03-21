<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => $this->faker->unique()->numerify('####-#####'),
            'last_name' => $this->faker->lastName(),
            'first_name' => $this->faker->firstName(),
            'middle_name' => $this->faker->optional()->lastName(),
            'sex' => $this->faker->randomElement(['Male', 'Female']),
            'course' => $this->faker->randomElement(['BSIT', 'BSCS', 'BSA', 'BSED', 'BSBA']),
            'year' => (string) $this->faker->numberBetween(1, 4),
            'units' => (string) $this->faker->numberBetween(18, 30),
            'section' => $this->faker->randomElement(['A', 'B', 'C', 'D']),
        ];
    }
}
