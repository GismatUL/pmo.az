<?php

namespace App\Http\Resources;

use App\Models\VideoCourse;
use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin VideoCourse */
class VideoCourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'body' => Media::blocks($this->body),
            'image' => Media::url($this->image),
            'url' => $this->url,
        ];
    }
}
