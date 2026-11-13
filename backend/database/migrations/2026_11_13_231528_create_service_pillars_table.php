<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_pillars', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('summary');
            $table->string('home_summary')->nullable();
            $table->json('highlights')->nullable();
            $table->json('body')->nullable();
            $table->string('link_label')->nullable();
            $table->string('link_url')->nullable();
            $table->string('image')->nullable();
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_pillars');
    }
};
