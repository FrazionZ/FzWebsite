<?php

namespace App\Http\Middleware;

use Laravel\Socialite\Facades\Socialite;
use Closure;
use Illuminate\Http\Request;

class GAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(!$request->session()->has('github')) return $this->redirectToGitAuth();
        try {
            $guser = Socialite::driver('github')->userFromToken($request->session()->get('github')->token);
            $request->attributes->add(['guser' => $guser]);
        }catch(\Exception $e){
            return $this->redirectToGitAuth();
        }
        return $next($request);
    }

    public function redirectToGitAuth(){
        return to_route('admin.github.auth.start');
        //return Socialite::driver('github')->scopes(['read:user', 'user', 'user:email', 'repo', 'project', 'read:project', 'public_repo', 'admin:org', 'write:org', 'read:org'])->redirect();
    }
}
