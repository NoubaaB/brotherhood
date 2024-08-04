<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Capital;
use App\Models\Notification;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use App\Models\Bill;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Bachir',
        //     'email' => 'bachirnoubaa117@gmail.com',
        // ]);
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
        ]);
        User::factory()->create([
            'name' => 'Test2 User2',
            'email' => 'test2@test2.com',
        ]);
        User::factory()->create([
            'name' => 'Test3 User3',
            'email' => 'test3@test3.com',
        ]);

        $bills = Bill::factory(3)->create();
        Product::factory(33)->create();
        Article::factory(300)->create();
        Capital::factory(14)->create();
        foreach ($bills as $bill) {
            $bill->update(["amount"=>$bill->articles()->sum("price")]);
        }
        // Notification::factory(30)->create();
    }
}
