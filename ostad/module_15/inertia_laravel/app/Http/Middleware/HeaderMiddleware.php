<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HeaderMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $allowedOrigins = [
            'http://localhost:5173', 
            'http://localhost:5174',  // for portfolio
        ];

        $origin = $request->header('Origin');

        if ($request->isMethod('OPTIONS')) {
            $response = response('', 200);

            if (in_array($origin, $allowedOrigins)) {
                $response->header('Access-Control-Allow-Origin', $origin);
                $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
                $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                $response->header('Access-Control-Allow-Credentials', 'true');
            }

            return $response;
        }

        $response = $next($request);

        if (in_array($origin, $allowedOrigins)) {
            $response->header('Access-Control-Allow-Origin', $origin);
            $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
            $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            $response->header('Access-Control-Allow-Credentials', 'true');
        }

        return $response;
    }
}