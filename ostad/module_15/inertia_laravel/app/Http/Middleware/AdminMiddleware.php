<?php

namespace App\Http\Middleware;

use App\Helper\JWTToken;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('token');
        $result = JWTToken::VerifyToken($token);

        if ($result == "unauthorized") {
            return redirect('/login');
        } else {
            $request->headers->set('email', $result->userEmail);
            $request->headers->set('id', $result->userID);
            $request->headers->set('username', $result->username);

            $user = User::find($result->userID);

            if (!$user || $user->role !== 'admin65') {
                return redirect('/login');
            }

            $request->headers->set('role', $user->role);

            return $next($request);
        }
    }
}
