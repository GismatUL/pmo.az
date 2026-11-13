<?php

namespace Database\Factories;

use App\Models\Program;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Program>
 */
class ProgramFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->randomElement(['IPMA ICB4', 'PMP® hazırlığı', 'GPM-b', 'PRINCE2®', 'ITIL®', 'CP3P / PPP', 'Change Management', 'Agile PM']).' '.fake()->unique()->numberBetween(1, 9999);
        $family = fake()->randomElement(Program::FAMILIES);

        return [
            'slug' => Str::slug($title),
            'family' => $family,
            'meta' => mb_strtoupper($family).' / SERTİFİKASİYA',
            'title' => $title,
            'summary' => fake()->sentence(12),
            'price' => null,
            'price_note' => 'Qiymət təsdiqlənir',
            'external_url' => 'https://pmu.az',
            'is_featured' => false,
            'is_published' => true,
            'sort' => fake()->numberBetween(0, 50),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn () => ['is_featured' => true]);
    }

    public function unpublished(): static
    {
        return $this->state(fn () => ['is_published' => false]);
    }
}
