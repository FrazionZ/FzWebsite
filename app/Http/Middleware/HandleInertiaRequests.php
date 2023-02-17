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
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'isAdmin' => ($isLogged) ? $request->user()->isAdmin() : false,
                'TwoFA' => ($isLogged) ? $request->user()->hasTwoFactorAuth() : false,
                'isLogged' => ($request->user() !== null)
            ],
            'navbar' => NavbarElements::get(),
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'csrf_token' => csrf_token()
        ]);
    }
}
