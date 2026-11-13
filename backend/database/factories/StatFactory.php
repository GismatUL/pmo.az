<?php

namespace Database\Factories;

use App\Models\Stat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Stat>
 */
class StatFactory extends Factory
{
    public function definition(): array
    {
        return [
            'value' => fake()->numberBetween(10, 2000).'+',
            'label' => fake()->words(2, true),
            'sort' => fake()->numberBetween(0, 10),
        ];
    }
}
