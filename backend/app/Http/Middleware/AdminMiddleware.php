<?php

namespace App\Http\Middleware;

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
    public function handle(Request $request, Closure $next): Response {
        $user = auth()->user(); // Obtiene el usuario autenticado

        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden - Admins only'], 403);
        }

        return $next($request);
    }
}
