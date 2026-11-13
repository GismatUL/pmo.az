<?php

use App\Livewire\Admin\Dashboard;
use App\Livewire\Admin\Enquiries;
use App\Livewire\Admin\Login;
use App\Livewire\Admin\ResourceForm;
use App\Livewire\Admin\ResourceIndex;
use App\Livewire\Admin\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// The public website is the Next.js app in frontend/; this app serves the API and the CMS.
Route::get('/', fn () => redirect()->route('admin.dashboard'));

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('login', Login::class)->middleware('guest')->name('login');

    Route::post('logout', function (Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    })->middleware('auth')->name('logout');

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/', Dashboard::class)->name('dashboard');
        Route::get('enquiries', Enquiries::class)->name('enquiries');
        Route::get('enquiries/{enquiry}', Enquiries::class)->name('enquiries.show');
        Route::get('settings', Settings::class)->name('settings');

        Route::get('{resource}', ResourceIndex::class)->name('resources.index');
        Route::get('{resource}/create', ResourceForm::class)->name('resources.create');
        Route::get('{resource}/{id}/edit', ResourceForm::class)->whereNumber('id')->name('resources.edit');
    });
});
