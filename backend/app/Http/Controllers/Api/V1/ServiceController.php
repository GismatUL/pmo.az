<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConsultingServiceResource;
use App\Http\Resources\ServicePillarResource;
use App\Models\ConsultingService;
use App\Models\ServicePillar;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                'pillars' => ServicePillarResource::collection(ServicePillar::query()->ordered()->get()),
                'consulting' => ConsultingServiceResource::collection(ConsultingService::query()->published()->ordered()->get()),
            ],
        ]);
    }

    public function show(ConsultingService $service): ConsultingServiceResource
    {
        abort_unless($service->is_published, 404);

        return new ConsultingServiceResource($service);
    }
}
