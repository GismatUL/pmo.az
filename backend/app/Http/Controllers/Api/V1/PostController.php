<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    /** GET /posts?category=Məqalələr&per_page=6&page=2 */
    public function index(Request $request): AnonymousResourceCollection
    {
        $filters = $request->validate([
            'category' => ['sometimes', 'nullable', Rule::in(array_keys(Post::CATEGORIES))],
            'featured' => ['sometimes', 'boolean'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:50'],
        ]);

        $posts = Post::query()
            ->published()
            ->when($filters['category'] ?? null, fn ($q, $category) => $q->where('category', $category))
            ->when($request->has('featured'), fn ($q) => $q->where('is_featured', $request->boolean('featured')))
            ->latestFirst()
            ->paginate($filters['per_page'] ?? 12)
            ->withQueryString();

        return PostResource::collection($posts);
    }

    /** GET /posts/{slug} — the article plus two related posts. */
    public function show(string $slug): JsonResponse
    {
        $post = Post::query()->published()->where('slug', $slug)->firstOrFail();

        $related = Post::query()
            ->published()
            ->whereKeyNot($post->getKey())
            ->orderByRaw('category = ? desc', [$post->category])
            ->latestFirst()
            ->limit(2)
            ->get();

        return response()->json([
            'data' => (new PostResource($post))->withBody()->resolve(),
            'related' => PostResource::collection($related)->resolve(),
        ]);
    }
}
