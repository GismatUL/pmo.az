<?php

namespace App\Http\Resources;

use App\Models\ConsultingService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin ConsultingService */
class ConsultingServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'n' => str_pad((string) ($this->sort + 1), 2, '0', STR_PAD_LEFT),
            'slug' => $this->slug,
            'title' => $this->title,
            'crumb' => $this->crumb ?? $this->title,
            'summary' => $this->summary,
            'intro' => $this->intro,
            'detail' => $this->detail,
        ];
    }
}
