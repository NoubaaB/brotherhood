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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->enum("opertaion",["Update","Delete","Create"]);
            $table->string("url",200);
            $table->string("text",200);
            $table->string("model",15);
            $table->boolean("read")->default(false);
            $table->foreignId('notify_user_id')->nullable()->index();
            $table->foreignId('trigger_user_id')->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
