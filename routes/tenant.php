<?php

declare(strict_types=1);

use App\Http\Controllers\AuthController;
use App\Http\Controllers\tenant\AttendanceController;
use App\Http\Controllers\Tenant\EventController;
use App\Http\Controllers\tenant\MasterlistController;
use App\Http\Controllers\Tenant\MasterlistImportController;
use App\Http\Middleware\EnsureTenantIsActive;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
    EnsureTenantIsActive::class,
])->group(function () {
    Route::get('/login', [AuthController::class, 'loginPage'])->name('tenant-login');
    Route::post('/login', [AuthController::class, 'login'])->name('tenant-login-api');
    Route::get('/logout', [AuthController::class, 'logout'])->name('tenant-logout-api');

    Route::middleware(['auth'])->group(function () {
        Route::get('/', fn () => redirect('/dashboard'));
        Route::get('/dashboard', fn () => Inertia::render('tenant/Dashboard'))->name('tenant-dashboard');

        Route::get('/events', [EventController::class, 'eventsPage'])->name('tenant-events');
        Route::get('/events/{eventID}', [EventController::class, 'eventDetailsPage'])->name('tenant-event-details');
        Route::post('/events', [EventController::class, 'store'])->name('tenant-events-create');

        Route::get('/attendance', [AttendanceController::class, 'index'])->name('tenant-attendance');
        Route::get('/masterlist', [MasterlistController::class, 'index'])->name('tenant-masterlist');

        Route::post('/masterlist/import/preview', [MasterlistImportController::class, 'preview'])->name('tenant-masterlist-import-preview');
        Route::post('/masterlist/import/store', [MasterlistImportController::class, 'store'])->name('tenant-masterlist-import-store');
        Route::get('/masterlist/import/template', [MasterlistImportController::class, 'downloadTemplate'])->name('tenant-masterlist-import-template');

        Route::get('/settings', fn () => Inertia::render('tenant/Settings'))->name('tenant-settings');
    });
});
