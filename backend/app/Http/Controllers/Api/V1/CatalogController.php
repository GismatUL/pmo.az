<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Http\Resources\ExpertResource;
use App\Http\Resources\ProgramResource;
use App\Http\Resources\VideoCourseResource;
use App\Models\Book;
use App\Models\Expert;
use App\Models\Program;
use App\Models\VideoCourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

class CatalogController extends Controller
{
    /** GET /programs?featured=1&family=IPMA&q=prince */
    public function programs(Request $request): AnonymousResourceCollection
    {
        $filters = $request->validate([
            'featured' => ['sometimes', 'boolean'],
            'family' => ['sometimes', 'nullable', Rule::in(Program::FAMILIES)],
            'q' => ['sometimes', 'nullable', 'string', 'max:100'],
        ]);

        $programs = Program::query()
            ->published()
            ->when($request->boolean('featured'), fn ($q) => $q->featured())
            ->when($filters['family'] ?? null, fn ($q, $family) => $q->where('family', $family))
            ->when($filters['q'] ?? null, fn ($q, $term) => $q->where(fn ($w) => $w
                ->where('title', 'like', "%{$term}%")
                ->orWhere('meta', 'like', "%{$term}%")
                ->orWhere('summary', 'like', "%{$term}%")))
            ->ordered()
            ->get();

        return ProgramResource::collection($programs);
    }

    public function experts(): AnonymousResourceCollection
    {
        return ExpertResource::collection(Expert::query()->published()->ordered()->get());
    }

    public function books(): AnonymousResourceCollection
    {
        return BookResource::collection(Book::query()->published()->ordered()->get());
    }

    public function videoCourses(): AnonymousResourceCollection
    {
        return VideoCourseResource::collection(VideoCourse::query()->published()->ordered()->get());
    }
}
