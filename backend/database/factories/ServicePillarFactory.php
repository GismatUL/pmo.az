<?php

namespace Database\Factories;

use App\Models\ServicePillar;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<ServicePillar>
 */
class ServicePillarFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->words(2, true);

        return [
            'slug' => Str::slug($title),
            'title' => Str::ucfirst($title),
            'summary' => fake()->sentence(8),
            'home_summary' => fake()->sentence(8),
            'highlights' => fake()->sentences(3),
            'body' => [['type' => 'p', 'text' => fake()->paragraph()]],
            'link_label' => 'Daha ətraflı',
            'link_url' => '/services',
            'sort' => fake()->numberBetween(0, 10),
        ];
    }
}
