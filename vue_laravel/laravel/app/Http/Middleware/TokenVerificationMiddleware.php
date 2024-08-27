<?php

namespace App\Http\Middleware;

use App\Helper\JWTToken;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TokenVerificationMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('token');
        $result = JWTToken::VerifyToken($token);
        
        if ($result == "unauthorized") {
            return redirect('/login');
        } else {
            $request->headers->set('email', $result->userEmail);
            $request->headers->set('id', $result->userID);
            $request->headers->set('username', $result->username);  // Set the username header
            
            $user = User::find($result->userID);
            $request->headers->set('role', $user->role);
            
            return $next($request);
        }
    }

}
