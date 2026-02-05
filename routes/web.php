<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

foreach (config('tenancy.central_domains') as $domain) {
    Route::domain($domain)->group(function () {
        Route::get('/', fn() => Inertia::render('LandingPage'))->name('landing-page');
        Route::get('/login', fn() => Inertia::render('Login'))->name('login-page');

        // Route::get('/students', [StudentController::class, 'index'])->name('students');
    });
}