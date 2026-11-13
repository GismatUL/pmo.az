<?php

use App\Http\Controllers\Api\V1\CatalogController;
use App\Http\Controllers\Api\V1\EnquiryController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\ServiceController;
use App\Http\Controllers\Api\V1\SiteController;
use Illuminate\Support\Facades\Route;

/*
 * Public content API consumed by the Next.js frontend (frontend/).
 * Read endpoints are cacheable and unauthenticated; enquiry submission is
 * rate limited.
 */
Route::prefix('v1')->name('api.v1.')->group(function () {
    Route::get('site', SiteController::class)->name('site');

    Route::get('programs', [CatalogController::class, 'programs'])->name('programs.index');
    Route::get('experts', [CatalogController::class, 'experts'])->name('experts.index');
    Route::get('books', [CatalogController::class, 'books'])->name('books.index');
    Route::get('video-courses', [CatalogController::class, 'videoCourses'])->name('video-courses.index');

    Route::get('services', [ServiceController::class, 'index'])->name('services.index');
    Route::get('services/{service:slug}', [ServiceController::class, 'show'])->name('services.show');

    Route::get('posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('posts/{slug}', [PostController::class, 'show'])->name('posts.show');

    Route::post('enquiries', [EnquiryController::class, 'store'])
        ->middleware('throttle:enquiries')
        ->name('enquiries.store');
});
