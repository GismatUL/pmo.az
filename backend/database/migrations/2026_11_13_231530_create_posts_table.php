<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('category', 32)->index();
            $table->string('title');
            $table->string('short_title')->nullable();
            $table->text('excerpt')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('cover_caption')->nullable();
            $table->json('body')->nullable();
            $table->json('toc')->nullable();
            $table->json('tags')->nullable();
            $table->string('author')->default('PMO.az');
            $table->boolean('is_featured')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->string('source_url')->nullable();
            $table->timestamps();

            // Public listing: published posts, newest first.
            $table->index('published_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
