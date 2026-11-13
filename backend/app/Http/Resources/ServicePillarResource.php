<?php

namespace App\Http\Resources;

use App\Models\ServicePillar;
use App\Support\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin ServicePillar */
class ServicePillarResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'summary' => $this->summary,
            'home_summary' => $this->home_summary,
            'highlights' => $this->highlights ?? [],
            'body' => Media::blocks($this->body),
            'link_label' => $this->link_label,
            'link_url' => $this->link_url,
        ];
    }
}
