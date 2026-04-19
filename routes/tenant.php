<?php

declare(strict_types=1);

use App\Enums\Permission;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Tenant\AttendanceController;
use App\Http\Controllers\Tenant\AttendanceRecordController;
use App\Http\Controllers\Tenant\EventController;
use App\Http\Controllers\Tenant\EventSessionController;
use App\Http\Controllers\Tenant\MasterlistController;
use App\Http\Controllers\Tenant\MasterlistImportController;
use App\Http\Controllers\Tenant\RoleController;
use App\Http\Controllers\Tenant\SupportController;
use App\Http\Controllers\Tenant\SystemUpdateController;
use App\Http\Controllers\Tenant\TenantSettingController;
use App\Http\Controllers\Tenant\UserController;
use App\Http\Middleware\CheckPermission;
use App\Http\Middleware\CheckUserActive;
use App\Http\Middleware\EnsureOnboardingCompleted;
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
    \App\Http\Middleware\TrackTenantApiRequests::class,
])->group(function () {
    Route::get('/login', [AuthController::class, 'loginPage'])->name('tenant-login');
    Route::post('/login', [AuthController::class, 'login'])->name('tenant-login-api');
    Route::post('/logout', [AuthController::class, 'logout'])->name('tenant-logout-api');

    Route::middleware(['auth', CheckUserActive::class])->group(function () {
        Route::get('/', fn () => redirect('/dashboard'));

        // Onboarding routes
        Route::get('/onboarding', fn () => Inertia::render('tenant/Onboarding'))->name('tenant-onboarding');
        Route::post('/onboarding/complete', function () {
            \App\Models\TenantSetting::setSetting('onboarding_completed', 'true');

            return redirect()->route('tenant-dashboard');
        })->name('tenant-onboarding-complete');

        // Settings (accessible during onboarding)
        Route::middleware(CheckPermission::class.':'.Permission::SettingsView)->group(function () {
            Route::get('/settings', [TenantSettingController::class, 'index'])->name('tenant-settings');
        });
        Route::put('/settings', [TenantSettingController::class, 'update'])->name('tenant-settings-update');
        Route::post('/settings/branding', [TenantSettingController::class, 'updateBranding'])->name('tenant-settings-branding');
        Route::put('/settings/university', [TenantSettingController::class, 'updateUniversity'])->name('tenant-settings-university');

        // Core functional routes (protected by EnsureOnboardingCompleted)
        Route::middleware([EnsureOnboardingCompleted::class])->group(function () {
            // Dashboard
            Route::middleware(CheckPermission::class.':'.Permission::DashboardView)->group(function () {
                Route::get('/dashboard', fn () => Inertia::render('tenant/Dashboard'))->name('tenant-dashboard');
            });

            // Events
            Route::middleware(CheckPermission::class.':'.Permission::EventsView)->group(function () {
                Route::get('/events', [EventController::class, 'eventsPage'])->name('tenant-events');
                Route::get('/events/{eventID}', [EventController::class, 'eventDetailsPage'])->name('tenant-event-details');
            });
            Route::post('/events', [EventController::class, 'store'])
                ->middleware(CheckPermission::class.':'.Permission::EventsCreate)
                ->name('tenant-events-create');

            // Event Sessions (under ATTENDANCE_RECORD)
            Route::middleware(CheckPermission::class.':'.Permission::AttendanceRecord)->group(function () {
                Route::post('/events/{event}/sessions', [EventSessionController::class, 'store'])->name('tenant-session-create');
                Route::post('/sessions/{session}/start', [EventSessionController::class, 'start'])->name('tenant-session-start');
                Route::post('/sessions/{session}/pause', [EventSessionController::class, 'pause'])->name('tenant-session-pause');
                Route::post('/sessions/{session}/resume', [EventSessionController::class, 'resume'])->name('tenant-session-resume');
                Route::post('/sessions/{session}/end', [EventSessionController::class, 'end'])->name('tenant-session-end');
            });

            // Attendance Records
            Route::middleware(CheckPermission::class.':'.Permission::AttendanceRecord)->group(function () {
                Route::post('/sessions/{session}/attendance', [AttendanceRecordController::class, 'store'])->name('tenant-attendance-store');
                Route::get('/sessions/{session}/attendance', [AttendanceRecordController::class, 'index'])->name('tenant-attendance-index');
                Route::get('/sessions/{session}/attendance/export', [AttendanceRecordController::class, 'export'])->name('tenant-attendance-export');
            });
            Route::middleware(CheckPermission::class.':'.Permission::AttendanceView)->group(function () {
                Route::get('/attendance', [AttendanceController::class, 'index'])->name('tenant-attendance');
            });

            // Masterlist
            Route::middleware(CheckPermission::class.':'.Permission::MasterlistView)->group(function () {
                Route::get('/masterlist', [MasterlistController::class, 'index'])->name('tenant-masterlist');
            });
            Route::post('/masterlist', [MasterlistController::class, 'store'])
                ->middleware(CheckPermission::class.':'.Permission::MasterlistCreate)
                ->name('tenant-masterlist-store');
            Route::put('/masterlist/{student}', [MasterlistController::class, 'update'])
                ->middleware(CheckPermission::class.':'.Permission::MasterlistUpdate)
                ->name('tenant-masterlist-update');
            Route::delete('/masterlist/{student}', [MasterlistController::class, 'destroy'])
                ->middleware(CheckPermission::class.':'.Permission::MasterlistDelete)
                ->name('tenant-masterlist-destroy');
            Route::middleware(CheckPermission::class.':'.Permission::MasterlistImport)->group(function () {
                Route::post('/masterlist/import/preview', [MasterlistImportController::class, 'preview'])->name('tenant-masterlist-import-preview');
                Route::post('/masterlist/import/store', [MasterlistImportController::class, 'store'])->name('tenant-masterlist-import-store');
                Route::get('/masterlist/import/template', [MasterlistImportController::class, 'downloadTemplate'])->name('tenant-masterlist-import-template');
            });

            // Users
            Route::middleware(CheckPermission::class.':'.Permission::UsersView)->group(function () {
                Route::get('/users', [UserController::class, 'index'])->name('tenant-users');
            });
            Route::post('/users', [UserController::class, 'store'])
                ->middleware(CheckPermission::class.':'.Permission::UsersCreate)
                ->name('tenant-users-store');
            Route::put('/users/{user}', [UserController::class, 'update'])
                ->middleware(CheckPermission::class.':'.Permission::UsersUpdate)
                ->name('tenant-users-update');
            Route::delete('/users/{user}', [UserController::class, 'destroy'])
                ->middleware(CheckPermission::class.':'.Permission::UsersDelete)
                ->name('tenant-users-destroy');

            // Roles
            Route::middleware(CheckPermission::class.':'.Permission::RolesView)->group(function () {
                Route::get('/roles', [RoleController::class, 'index'])->name('tenant-roles');
            });
            Route::post('/roles', [RoleController::class, 'store'])
                ->middleware(CheckPermission::class.':'.Permission::RolesCreate)
                ->name('tenant-roles-store');
            Route::put('/roles/{role}', [RoleController::class, 'update'])
                ->middleware(CheckPermission::class.':'.Permission::RolesUpdate)
                ->name('tenant-roles-update');
            Route::delete('/roles/{role}', [RoleController::class, 'destroy'])
                ->middleware(CheckPermission::class.':'.Permission::RolesDelete)
                ->name('tenant-roles-destroy');

            // System Updates
            Route::middleware(CheckPermission::class.':'.Permission::SystemUpdateView)->group(function () {
                Route::get('/system/updates', [SystemUpdateController::class, 'index'])->name('tenant-system-updates');
                Route::post('/system/updates/check', [SystemUpdateController::class, 'check'])->name('tenant-system-updates-check');
            });
            Route::post('/system/updates/apply', [SystemUpdateController::class, 'apply'])
                ->middleware(CheckPermission::class.':'.Permission::SystemUpdateApply)
                ->name('tenant-system-updates-apply');
            Route::post('/system/updates/rollback', [SystemUpdateController::class, 'rollback'])
                ->middleware(CheckPermission::class.':'.Permission::SystemUpdateApply)
                ->name('tenant-system-updates-rollback');

            // Support
            Route::middleware(CheckPermission::class.':'.Permission::SupportView)->group(function () {
                Route::get('/support', [SupportController::class, 'index'])->name('tenant-support');
                Route::get('/support/{ticket}', [SupportController::class, 'show'])->name('tenant-support-thread');
            });
            Route::middleware(CheckPermission::class.':'.Permission::SupportCreate)->group(function () {
                Route::post('/support', [SupportController::class, 'store'])->name('tenant-support-store');
                Route::post('/support/{ticket}/reply', [SupportController::class, 'reply'])->name('tenant-support-reply');
                Route::post('/support/{ticket}/close', [SupportController::class, 'close'])->name('tenant-support-close');
            });
        });
    });
});
