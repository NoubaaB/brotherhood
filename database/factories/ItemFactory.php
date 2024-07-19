<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
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
            "date"=>fake()->dateTimeBetween("-7 days","now"),
            "description"=>fake()->text(300),
            "price"=>fake()->numberBetween(1,4),
            "is_private"=>fake()->boolean(),
            "user_id"=>fake()->numberBetween(1,3),
            "product_id"=>fake()->numberBetween(1,33),
        ];
    }
}
