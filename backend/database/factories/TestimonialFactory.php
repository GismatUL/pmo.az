<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'role' => fake()->jobTitle(),
            'quote' => fake()->paragraph(),
            'photo' => null,
            'is_published' => true,
            'sort' => fake()->numberBetween(0, 20),
        ];
    }
}
