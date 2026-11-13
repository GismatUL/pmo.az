<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('family', 32)->index();
            $table->string('meta');
            $table->string('title');
            $table->text('summary');
            $table->string('home_meta')->nullable();
            $table->text('home_summary')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('price_note')->default('Qiymət təsdiqlənir');
            $table->string('external_url')->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_published')->default(true);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
