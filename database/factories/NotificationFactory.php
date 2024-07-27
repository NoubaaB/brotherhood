<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
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
            "operation"=>fake()->randomElement(["Edit", "Delete", "Create"]),
            "url"=>fake()->url(),
            "text"=>fake()->text(150),
            "model"=>fake()->randomElement(["Bill", "Article", "Capital"]),
            "read"=>fake()->boolean(),
            "notify_user_id"=>fake()->randomElement([1,2]),
            "trigger_user_id"=>fake()->randomElement([1,2]),
        ];
    }
}
