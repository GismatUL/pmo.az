<?php

namespace Database\Factories;

use App\Models\Partner;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Partner>
 */
class PartnerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->company(),
            'type' => 'partner',
            'logo' => null,
            'url' => fake()->url(),
            'is_published' => true,
            'sort' => fake()->numberBetween(0, 20),
        ];
    }
}
