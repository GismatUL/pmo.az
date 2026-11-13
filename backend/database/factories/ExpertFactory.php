<?php

namespace Database\Factories;

use App\Models\Expert;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Expert>
 */
class ExpertFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->name();

        return [
            'slug' => Str::slug($name),
            'name' => $name,
            'position' => fake()->jobTitle(),
            'bio' => fake()->paragraph(),
            'photo' => null,
            'articles' => [],
            'is_founder' => false,
            'is_published' => true,
            'sort' => fake()->numberBetween(1, 50),
        ];
    }
}
