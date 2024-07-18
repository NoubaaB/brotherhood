<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Limit;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
        ]);

        User::factory(2)->create();
        Product::factory(33)->create();
        Item::factory(150)->create();
        Limit::factory(6)->create();

    }
}
