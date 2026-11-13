<?php

namespace Database\Factories;

use App\Models\ConsultingService;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<ConsultingService>
 */
class ConsultingServiceFactory extends Factory
{
    public function definition(): array
    {
        $title = Str::ucfirst(fake()->unique()->words(3, true));

        return [
            'slug' => Str::slug($title),
            'title' => $title,
            'crumb' => $title,
            'summary' => fake()->sentence(10),
            'intro' => fake()->sentence(14),
            'detail' => null,
            'is_published' => true,
            'sort' => fake()->numberBetween(0, 10),
        ];
    }
}
