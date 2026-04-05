<?php

declare(strict_types=1);

use App\Http\Controllers\AuthController;
use App\Http\Controllers\tenant\AttendanceController;
use App\Http\Controllers\Tenant\AttendanceRecordController;
use App\Http\Controllers\Tenant\EventController;
use App\Http\Controllers\Tenant\EventSessionController;
use App\Http\Controllers\tenant\MasterlistController;
use App\Http\Controllers\Tenant\MasterlistImportController;
use App\Http\Controllers\Tenant\TenantSettingController;
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
    Route::post('/logout', [AuthController::class, 'logout'])->name('tenant-logout-api');

    Route::middleware(['auth'])->group(function () {
        Route::get('/', fn () => redirect('/dashboard'));

        // Onboarding routes
        Route::get('/onboarding', fn () => Inertia::render('tenant/Onboarding'))->name('tenant-onboarding');
        Route::post('/onboarding/complete', function () {
            \App\Models\TenantSetting::setSetting('onboarding_completed', 'true');

            return redirect()->route('tenant-dashboard');
        })->name('tenant-onboarding-complete');

        // Settings are accessible during onboarding
        Route::get('/settings', [TenantSettingController::class, 'index'])->name('tenant-settings');
        Route::put('/settings', [TenantSettingController::class, 'update'])->name('tenant-settings-update');
        Route::post('/settings/branding', [TenantSettingController::class, 'updateBranding'])->name('tenant-settings-branding');
        Route::put('/settings/university', [TenantSettingController::class, 'updateUniversity'])->name('tenant-settings-university');

        // Core functional routes (protected by EnsureOnboardingCompleted)
        Route::middleware([\App\Http\Middleware\EnsureOnboardingCompleted::class])->group(function () {
            Route::get('/dashboard', fn () => Inertia::render('tenant/Dashboard'))->name('tenant-dashboard');

            Route::get('/events', [EventController::class, 'eventsPage'])->name('tenant-events');
            Route::get('/events/{eventID}', [EventController::class, 'eventDetailsPage'])->name('tenant-event-details');
            Route::post('/events', [EventController::class, 'store'])->name('tenant-events-create');

            // Event Sessions
            Route::post('/events/{event}/sessions', [EventSessionController::class, 'store'])->name('tenant-session-create');
            Route::post('/sessions/{session}/start', [EventSessionController::class, 'start'])->name('tenant-session-start');
            Route::post('/sessions/{session}/pause', [EventSessionController::class, 'pause'])->name('tenant-session-pause');
            Route::post('/sessions/{session}/resume', [EventSessionController::class, 'resume'])->name('tenant-session-resume');
            Route::post('/sessions/{session}/end', [EventSessionController::class, 'end'])->name('tenant-session-end');

            // Attendance Records
            Route::post('/sessions/{session}/attendance', [AttendanceRecordController::class, 'store'])->name('tenant-attendance-store');
            Route::get('/sessions/{session}/attendance', [AttendanceRecordController::class, 'index'])->name('tenant-attendance-index');
            Route::get('/sessions/{session}/attendance/export', [AttendanceRecordController::class, 'export'])->name('tenant-attendance-export');

            Route::get('/attendance', [AttendanceController::class, 'index'])->name('tenant-attendance');
            Route::get('/masterlist', [MasterlistController::class, 'index'])->name('tenant-masterlist');
            Route::post('/masterlist', [MasterlistController::class, 'store'])->name('tenant-masterlist-store');
            Route::put('/masterlist/{student}', [MasterlistController::class, 'update'])->name('tenant-masterlist-update');
            Route::delete('/masterlist/{student}', [MasterlistController::class, 'destroy'])->name('tenant-masterlist-destroy');

            Route::post('/masterlist/import/preview', [MasterlistImportController::class, 'preview'])->name('tenant-masterlist-import-preview');
            Route::post('/masterlist/import/store', [MasterlistImportController::class, 'store'])->name('tenant-masterlist-import-store');
            Route::get('/masterlist/import/template', [MasterlistImportController::class, 'downloadTemplate'])->name('tenant-masterlist-import-template');
        });
    });
});
