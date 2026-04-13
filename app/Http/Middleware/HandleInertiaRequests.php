<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'tenantPlan' => function () {
                if (function_exists('tenant') && tenant()) {
                    return tenant('plan') ?? 'basic';
                }

                return null;
            },
            'tenantSettings' => function () {
                if (function_exists('tenant') && tenant()) {
                    return \App\Models\TenantSetting::getSettings();
                }

                return [];
            },
            'tenantOrganizationName' => function () {
                if (function_exists('tenant') && tenant()) {
                    return tenant('organization_name') ?: 'My Organization';
                }

                return null;
            },
            'tenantUniversity' => function () {
                if (function_exists('tenant') && tenant()) {
                    return tenant('university') ?: 'University';
                }

                return null;
            },
            'userPermissions' => function () use ($request) {
                $user = $request->user();

                if (! $user || ! function_exists('tenant') || ! tenant()) {
                    return [];
                }

                if (! $user->relationLoaded('roles')) {
                    $user->load('roles');
                }

                return $user->getAllPermissions();
            },
            'systemVersion' => function () {
                if (function_exists('tenant') && tenant()) {
                    return trim((string) shell_exec('git describe --tags --abbrev=0 2>/dev/null')) ?: null;
                }

                return null;
            },
        ];
    }
}
