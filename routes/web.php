<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

foreach (config('tenancy.central_domains') as $domain) {
    Route::domain($domain)->group(function () {
        Route::get('/', fn () => Inertia::render('LandingPage'))->name('landing-page');

        Route::get('/login', [AuthController::class, 'loginPage'])->name('login');
        Route::post('/login', [AuthController::class, 'login'])->name('login-api');

        Route::get('/logout', [AuthController::class, 'logout'])->name('logout-api');

        Route::get('/signup', [AuthController::class, 'signupPage'])->name('signup-page');
        Route::post('/signup', [AuthController::class, 'signup'])->name('signup-api');

        Route::post('/signup/send-code', \App\Http\Controllers\Signup\SendCodeController::class)->name('signup.send-code');
        Route::post('/signup/basic', \App\Http\Controllers\Signup\BasicSignupController::class)->name('signup.basic');
        Route::post('/signup/premium', \App\Http\Controllers\Signup\PremiumSignupController::class)->name('signup.premium');

        Route::get('/signup/success', \App\Http\Controllers\Signup\SignupSuccessController::class)->name('signup.success');

        Route::middleware(['auth'])->group(function () {
            Route::get('/admin', fn () => redirect('/admin/dashboard'));
            Route::get('/admin/dashboard', \App\Http\Controllers\Admin\DashboardController::class)->name('admin.dashboard');

            Route::get('/admin/requests', [\App\Http\Controllers\Admin\TenantRequestController::class, 'index'])->name('admin.requests');
            Route::post('/admin/requests/{tenant}/approve', [\App\Http\Controllers\Admin\TenantRequestController::class, 'approve'])->name('admin.requests.approve');
            Route::post('/admin/requests/{tenant}/reject', [\App\Http\Controllers\Admin\TenantRequestController::class, 'reject'])->name('admin.requests.reject');

            Route::get('/admin/tenants', [\App\Http\Controllers\Admin\TenantController::class, 'index'])->name('admin.tenants');
            Route::post('/admin/tenants/{tenant}/toggle-status', [\App\Http\Controllers\Admin\TenantController::class, 'toggleStatus'])->name('admin.tenants.toggle-status');

            Route::get('/admin/payments', [\App\Http\Controllers\Admin\PaymentController::class, 'index'])->name('admin.payments');
        });
    });
}
