<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MonitoringController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\TenantRequestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Signup\BasicSignupController;
use App\Http\Controllers\Signup\PremiumSignupController;
use App\Http\Controllers\Signup\SendCodeController;
use App\Http\Controllers\Signup\SignupSuccessController;
use Illuminate\Support\Facades\Route;

foreach (config('tenancy.central_domains') as $domain) {
    Route::domain($domain)->group(function () {
        Route::get('/', [\App\Http\Controllers\LandingPageController::class, 'index'])->name('landing-page');

        Route::get('/login', [AuthController::class, 'loginPage'])->name('login');
        Route::post('/login', [AuthController::class, 'login'])->name('login-api');

        Route::post('/logout', [AuthController::class, 'logout'])->name('logout-api');

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
            Route::post('/admin/tenants/{tenant}/notify-subscription', [TenantController::class, 'notifySubscription'])->name('admin.tenants.notify');

            Route::get('/admin/payments', [PaymentController::class, 'index'])->name('admin.payments');

            Route::get('/admin/monitoring', [MonitoringController::class, 'index'])->name('admin.monitoring');

            Route::get('/admin/plans', [\App\Http\Controllers\Admin\PlanController::class, 'index'])->name('admin.plans');
            Route::post('/admin/plans', [\App\Http\Controllers\Admin\PlanController::class, 'store'])->name('admin.plans.store');
            Route::patch('/admin/plans/{plan}', [\App\Http\Controllers\Admin\PlanController::class, 'update'])->name('admin.plans.update');
            Route::post('/admin/plans/{plan}/toggle-status', [\App\Http\Controllers\Admin\PlanController::class, 'toggleStatus'])->name('admin.plans.toggle-status');
        });
    });
}
