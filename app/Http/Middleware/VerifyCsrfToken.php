<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyCsrfToken
{
    /**
     * Los URIs que deberían ser excluidos de la verificación de CSRF.
     *
     * @var array
     */
    protected $except = [
        // Aquí puedes agregar rutas que no necesiten protección CSRF
        // Ejemplo:
        // 'api/*',
    ];

    /**
     * Maneja la solicitud entrante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Verifica el token CSRF en la solicitud
        // Si la solicitud es de un tipo POST, PUT, PATCH o DELETE
        if ($this->isReading($request) || $this->tokensMatch($request)) {
            return $next($request);
        }

        throw new \Illuminate\Session\TokenMismatchException;
    }

    /**
     * Determina si la solicitud está siendo solo leída.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function isReading(Request $request)
    {
        return $request->isMethod('GET') || $request->isMethod('HEAD');
    }

    /**
     * Determina si el token CSRF en la solicitud coincide con el token en la sesión.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function tokensMatch(Request $request)
    {
        // Comprueba que el token CSRF en la solicitud sea válido
        $token = $request->input('_token') ?: $request->header('X-CSRF-TOKEN');

        return hash_equals($this->getTokenFromSession($request), $token);
    }

    /**
     * Obtiene el token CSRF de la sesión.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function getTokenFromSession(Request $request)
    {
        return $request->session()->token();
    }
}
