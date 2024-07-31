<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Capitalt>
 */
class CapitalFactory extends Factory
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
            "date_start"=>fake()->date("Y-m-d"),
            "date_end"=>fake()->date("Y-m-d"),
            "user_id" => fake()->numberBetween(1, 3),
            "amount"=>fake()->numberBetween(14,16)
        ];
    }
}
