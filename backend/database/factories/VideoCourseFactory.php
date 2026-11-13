<?php

namespace Database\Factories;

use App\Models\VideoCourse;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<VideoCourse>
 */
class VideoCourseFactory extends Factory
{
    public function definition(): array
    {
        $title = rtrim(fake()->unique()->sentence(3), '.');

        return [
            'slug' => Str::slug($title),
            'title' => $title,
            'body' => [['type' => 'p', 'text' => fake()->paragraph()]],
            'image' => null,
            'url' => 'https://edu.pmo.az',
            'is_published' => true,
            'sort' => fake()->numberBetween(0, 20),
        ];
    }
}
