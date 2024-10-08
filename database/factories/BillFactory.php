<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bill>
 */
class BillFactory extends Factory
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
            "date" => date_format(fake()->dateTimeBetween("-1 days", "now"),"Y-m-d"),
            "user_id"=>fake()->numberBetween(1,3)
        ];
    }
}
