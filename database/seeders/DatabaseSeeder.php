<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Capital;
use App\Models\Notification;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use App\Models\Total;
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

        $totals = Total::factory(3)->create();
        Product::factory(33)->create();
        Article::factory(300)->create();
        Capital::factory(14)->create();
        foreach ($totals as $total) {
            $total->update(["amount"=>$total->articles()->sum("price")]);
        }
        Notification::factory(30)->create();
    }
}
