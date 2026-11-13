<?php

namespace Database\Factories;

use App\Models\Enquiry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Enquiry>
 */
class EnquiryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->optional()->numerify('+994 5# ### ## ##'),
            'company' => fake()->optional()->company(),
            'message' => fake()->paragraph(),
            'source' => fake()->randomElement(['home', 'contact']),
            'status' => 'new',
        ];
    }
}
