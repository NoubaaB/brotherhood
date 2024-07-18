<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Capitalt>
 */
class CapitaltFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            "date_start"=>fake()->date(),
            "date_end"=>fake()->date(),
            "amount"=>fake()->numberBetween(1,80)
        ];
    }
}
