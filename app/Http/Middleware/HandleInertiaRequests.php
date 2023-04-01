<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use App\Models\NavbarElements;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $isLogged =  ($request->user() !== null);
        $perms = [];
        if($isLogged){
            foreach($request->user()->getPermissions() as $perm){
                array_push($perms, $perm->slug);
            }
        }
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'isAdmin' => ($isLogged) ? $request->user()->isAdmin() : false,
                'isAccessAdmin' => ($isLogged) ? ($request->user()->isAdmin() || $request->user()->hasPermission('admin.access')) ? true : false  : false,
                'TwoFA' => ($isLogged) ? $request->user()->hasTwoFactorAuth() : false,
                'permissions' => $perms,
                'isLogged' => ($request->user() !== null)
            ],
            'recaptcha_site_key' => config('services.google_recaptcha.site_key'),
            'navbar' => NavbarElements::get(),
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
                'dataReset' => fn () => $request->session()->get('dataReset')
            ],
            'csrf_token' => csrf_token()
        ]);
    }
}
