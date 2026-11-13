<?php

namespace App\Http\Resources;

use App\Models\Expert;
use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Expert */
class ExpertResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'position' => $this->position,
            'bio' => $this->bio,
            'photo' => Media::url($this->photo),
            'articles' => $this->articles ?? [],
            'is_founder' => $this->is_founder,
        ];
    }
}
