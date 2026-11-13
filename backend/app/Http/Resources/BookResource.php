<?php

namespace App\Http\Resources;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Book */
class BookResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'format' => $this->format,
            'excerpt' => $this->excerpt,
            'price' => $this->price !== null ? (float) $this->price : null,
            'url' => $this->url,
        ];
    }
}
