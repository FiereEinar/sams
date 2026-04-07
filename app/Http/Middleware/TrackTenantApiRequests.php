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
            $month = date('Y-m');
            
            \App\Models\TenantMetric::upsert(
                [
                    ['tenant_id' => tenant('id'), 'month' => $month, 'api_requests_count' => 1, 'bandwidth_used' => $contentLen]
                ],
                ['tenant_id', 'month'],
                [
                    'api_requests_count' => \Illuminate\Support\Facades\DB::raw('api_requests_count + 1'),
                    'bandwidth_used' => \Illuminate\Support\Facades\DB::raw("bandwidth_used + $contentLen")
                ]
            );
        }

        return $response;
    }
}
