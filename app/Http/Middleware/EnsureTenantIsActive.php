<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTenantIsActive
{
    public function handle(Request $request, Closure $next): Response
    {
        $tenant = tenant();

        if ($tenant && $tenant->status !== 'active') {
            abort(403, 'This organization is currently inactive. Please contact your administrator.');
        }

        return $next($request);
    }
}
