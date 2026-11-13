<?php

namespace App\Http\Resources;

use App\Models\Post;
use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Post */
class PostResource extends JsonResource
{
    /** Include the full article body (detail endpoint only). */
    public bool $withBody = false;

    public function withBody(): static
    {
        $this->withBody = true;

        return $this;
    }

    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'category' => $this->category,
            'kind' => $this->kindLabel(),
            'title' => $this->title,
            'short_title' => $this->short_title,
            'excerpt' => $this->excerpt,
            'image' => Media::url($this->cover_image),
            'image_caption' => $this->cover_caption,
            'author' => $this->author,
            'is_featured' => $this->is_featured,
            'date' => $this->published_at?->toDateString(),
            'body' => $this->when($this->withBody, fn () => Media::blocks($this->body)),
            'toc' => $this->when($this->withBody, $this->toc),
            'tags' => $this->when($this->withBody, $this->tags),
        ];
    }
}
