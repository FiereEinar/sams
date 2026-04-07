<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackTenantApiRequests
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (function_exists('tenant') && tenant()) {
            $contentLen = strlen((string) $response->getContent());
            \App\Models\Tenant::where('id', tenant('id'))->increment('api_requests_count');
            \App\Models\Tenant::where('id', tenant('id'))->increment('bandwidth_used', $contentLen);
        }

        return $response;
    }
}
