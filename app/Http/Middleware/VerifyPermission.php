<?php

namespace App\Http\Middleware;

use App\Exceptions\PermissionDeniedException;
use App\Models\Logger;
use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;

class VerifyPermission
{
    /**
     * @var Guard
     */
    protected $auth;

    /**
     * Create a new filter instance.
     *
     * @param Guard $auth
     */
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param Request    $request
     * @param \Closure   $next
     * @param int|string $permission
     *
     * @throws \jeremykenedy\LaravelRoles\App\Exceptions\PermissionDeniedException
     *
     * @return mixed
     */
    public function handle($request, Closure $next, ...$permission)
    {
        if(Auth::user() == null){
            return redirect()->route('login');
        }

        $permission = join(',', $permission);
        if ($this->auth->check() && $this->auth->user()->hasPermission($permission)) {
            return $next($request);
        }

        Logger::log('user.permission.denied', json_encode(array('key' => $permission)), null, $this->auth->user());

        throw new PermissionDeniedException($permission);
    }
}

