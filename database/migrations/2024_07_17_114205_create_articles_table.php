<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    //alter table articles add column users_id longtext not null default '[]'
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->date("date");
            $table->string("description",400)->nullable();
            $table->double("price");
            $table->boolean("is_private")->default(false);
            $table->boolean("star")->default(false);

            $table->foreignId('user_id')->nullable()->index();
            $table->foreignId('product_id')->nullable()->index();
            $table->foreignId('bill_id')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
