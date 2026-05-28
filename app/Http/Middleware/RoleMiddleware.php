<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Verificar si el usuario está activo
        if ($user->estado !== 'activo') {
            auth()->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect()->route('login')->with('error', 'Tu usuario está inactivo. Por favor contacta al administrador.');
        }

        // Si es admin, tiene acceso total
        if ($user->rol === 'admin') {
            return $next($request);
        }

        // Verificar si tiene el rol requerido
        if (in_array($user->rol, $roles)) {
            return $next($request);
        }

        // Verificar permisos específicos (vistas)
        // Obtenemos el módulo del nombre de la ruta (ej: products.index -> products)
        $routeName = $request->route()->getName();
        $module = explode('.', $routeName)[0] ?? null;

        if ($module && is_array($user->permissions) && in_array($module, $user->permissions)) {
            return $next($request);
        }

        // Si no tiene permiso, redirigir al dashboard con un mensaje de error
        return redirect()->route('dashboard')->with('error', 'No tienes permiso para acceder a este módulo.');
    }
}
