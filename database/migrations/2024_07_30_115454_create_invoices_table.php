<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->double("spent");
            $table->double("price");
            $table->boolean("checked")->default(false);
            $table->foreignId('user_id')->nullable()->index();
            $table->foreignId('bill_id')->nullable()->index();
            $table->unique(['user_id', 'bill_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
