<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Models\Setting;
use App\Models\Stat;
use App\Models\Testimonial;
use App\Support\Media;
use Illuminate\Http\JsonResponse;

/** Site-wide data used by every page: contact settings, stats, partners, testimonials. */
class SiteController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'data' => [
                'settings' => Setting::map(),
                'stats' => Stat::query()->ordered()->get(['value', 'label']),
                'partners' => Partner::query()->published()->ordered()->get()->map(fn (Partner $p) => [
                    'name' => $p->name,
                    'type' => $p->type,
                    'logo' => Media::url($p->logo),
                    'url' => $p->url,
                ]),
                'testimonials' => Testimonial::query()->published()->ordered()->get()->map(fn (Testimonial $t) => [
                    'name' => $t->name,
                    'role' => $t->role,
                    'quote' => $t->quote,
                    'photo' => Media::url($t->photo),
                ]),
            ],
        ]);
    }
}
