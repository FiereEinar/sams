<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Signup\SendCodeController;
use App\Http\Controllers\Signup\BasicSignupController;
use App\Http\Controllers\Signup\PremiumSignupController;
use App\Http\Controllers\Signup\SignupSuccessController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TenantRequestController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\PaymentController;

foreach (config('tenancy.central_domains') as $domain) {
    Route::domain($domain)->group(function () {
        Route::get('/', fn () => Inertia::render('LandingPage'))->name('landing-page');

        Route::get('/login', [AuthController::class, 'loginPage'])->name('login');
        Route::post('/login', [AuthController::class, 'login'])->name('login-api');

        Route::get('/logout', [AuthController::class, 'logout'])->name('logout-api');

        Route::get('/signup', [AuthController::class, 'signupPage'])->name('signup-page');
        Route::post('/signup', [AuthController::class, 'signup'])->name('signup-api');

        Route::post('/signup/send-code', SendCodeController::class)->name('signup.send-code');
        Route::post('/signup/basic', BasicSignupController::class)->name('signup.basic');
        Route::post('/signup/premium', PremiumSignupController::class)->name('signup.premium');
        Route::get('/signup/success', SignupSuccessController::class)->name('signup.success');

        Route::middleware(['auth'])->group(function () {
            Route::get('/admin', fn () => redirect('/admin/dashboard'));
            Route::get('/admin/dashboard', DashboardController::class)->name('admin.dashboard');

            Route::get('/admin/requests', [TenantRequestController::class, 'index'])->name('admin.requests');
            Route::post('/admin/requests/{tenant}/approve', [TenantRequestController::class, 'approve'])->name('admin.requests.approve');
            Route::post('/admin/requests/{tenant}/reject', [TenantRequestController::class, 'reject'])->name('admin.requests.reject');

            Route::get('/admin/tenants', [TenantController::class, 'index'])->name('admin.tenants');
            Route::post('/admin/tenants/{tenant}/toggle-status', [TenantController::class, 'toggleStatus'])->name('admin.tenants.toggle-status');

            Route::get('/admin/payments', [PaymentController::class, 'index'])->name('admin.payments');
        });
    });
}
