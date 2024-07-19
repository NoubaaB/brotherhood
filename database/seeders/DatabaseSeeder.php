<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Capital;
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
        User::factory()->create([
            'name' => 'Test2 User2',
            'email' => 'test2@test2.com',
        ]);

        Product::factory(33)->create();
        Item::factory(150)->create();
        Capital::factory(14)->create();

    }
}
