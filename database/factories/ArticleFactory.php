<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
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
            "date"=>date_format(fake()->dateTimeBetween("-30 days", "now"),"Y-m-d"),
            "description"=>fake()->text(300),
            "price"=>fake()->numberBetween(1,4),
            "is_private"=>fake()->boolean(),
            "star"=>fake()->boolean(),
            "user_id"=>fake()->numberBetween(1,3),
            "product_id"=>fake()->numberBetween(1,33),
            // "bill_id"=>fake()->randomElement([1,2,3,null, null, null, null, null, null]),
        ];
    }
}
