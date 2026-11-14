<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEnquiryRequest;
use App\Services\EnquiryService;
use Illuminate\Http\JsonResponse;

class EnquiryController extends Controller
{
    public function store(StoreEnquiryRequest $request, EnquiryService $enquiries): JsonResponse
    {
        $enquiry = $enquiries->submit(
            $request->safe()->except(['website', 'captcha']),
            $request->ip(),
            $request->userAgent(),
        );

        return response()->json([
            'data' => ['id' => $enquiry->id, 'status' => $enquiry->status],
            'message' => 'Təşəkkür edirik! Komandamız tezliklə sizinlə əlaqə saxlayacaq.',
        ], 201);
    }
}
