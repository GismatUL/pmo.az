<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    public function definition(): array
    {
        $title = Str::ucfirst(fake()->unique()->sentence(6));

        return [
            'slug' => Str::slug($title),
            'category' => fake()->randomElement(array_keys(Post::CATEGORIES)),
            'title' => rtrim($title, '.'),
            'excerpt' => fake()->sentence(18),
            'cover_image' => null,
            'body' => [
                ['type' => 'p', 'text' => fake()->paragraph(5)],
                ['type' => 'h2', 'text' => rtrim(fake()->sentence(4), '.')],
                ['type' => 'p', 'text' => fake()->paragraph(6)],
            ],
            'tags' => fake()->words(3),
            'author' => 'PMO.az',
            'is_featured' => false,
            'published_at' => fake()->dateTimeBetween('-1 year', '-1 day'),
        ];
    }

    public function draft(): static
    {
        return $this->state(fn () => ['published_at' => null]);
    }

    public function featured(): static
    {
        return $this->state(fn () => ['is_featured' => true]);
    }
}
