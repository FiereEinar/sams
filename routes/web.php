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
    });
}
