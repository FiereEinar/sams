<?php

declare(strict_types=1);

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    Route::get('/login', [AuthController::class, 'loginPage'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login-api');

    Route::middleware(['auth'])->group(function () {
        Route::get('/', fn() => redirect('/dashboard'));
        Route::get('/dashboard', fn() => Inertia::render('tenant/Dashboard'))->name('tenant-dashboard');
        Route::get('/events', fn() => Inertia::render('tenant/Events'))->name('tenant-events');
        Route::get('/attendance', fn() => Inertia::render('tenant/Attendance'))->name('tenant-attendance');
        Route::get('/masterlist', fn() => Inertia::render('tenant/Masterlist'))->name('tenant-masterlist');
        Route::get('/analytics', fn() => Inertia::render('tenant/Analytics'))->name('tenant-analytics');
        Route::get('/settings', fn() => Inertia::render('tenant/Settings'))->name('tenant-settings');
    });
});
