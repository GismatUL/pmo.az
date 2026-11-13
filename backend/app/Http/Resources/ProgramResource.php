<?php

namespace App\Http\Resources;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Program */
class ProgramResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'family' => $this->family,
            'meta' => $this->meta,
            'title' => $this->title,
            'summary' => $this->summary,
            'home_meta' => $this->home_meta,
            'home_summary' => $this->home_summary,
            'price' => $this->price !== null ? (float) $this->price : null,
            'price_note' => $this->price_note,
            'url' => $this->external_url,
            'is_featured' => $this->is_featured,
        ];
    }
}
