<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Book>
 */
class BookFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => rtrim(fake()->unique()->sentence(4), '.'),
            'author' => fake()->name(),
            'format' => 'Elektron kitab',
            'excerpt' => fake()->sentence(16),
            'price' => fake()->randomFloat(2, 5, 80),
            'url' => 'https://pmbook.az',
            'is_published' => true,
            'sort' => fake()->numberBetween(0, 20),
        ];
    }
}
