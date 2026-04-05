<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnboardingCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $settings = \App\Models\TenantSetting::getSettings();

        if (! isset($settings['onboarding_completed']) || $settings['onboarding_completed'] !== 'true') {
            return redirect()->route('tenant-onboarding');
        }

        return $next($request);
    }
}
