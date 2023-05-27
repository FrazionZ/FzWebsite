<?php

namespace App\Http\Middleware;

use App\Models\Notifications;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        if($request->user() !== null){
            if($request->user()->isDeleted() || $request->user()->isBanned()){
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                redirect($request->path())->with('status', ["type" => 'error', "msg" => 'Vous avez été déconnecté par notre système.']);
            }
        }
        $isLogged =  ($request->user() !== null);
        $perms = [];
        if($isLogged){
            foreach($request->user()->getPermissions() as $perm){
                array_push($perms, $perm->slug);
            }
            $notifications = Notifications::where('user_id', $request->user()->id)->get();
            foreach($notifications as $notification){
                $notification->data = json_decode($notification->data, true);
                $notification->enum = $notification->determineEnum($notification);
            }
            
        }
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'role' => ($isLogged) ? $request->user()->getHigherRole() : null,
                'isAdmin' => ($isLogged) ? $request->user()->isAdmin() : false,
                'isAccessAdmin' => ($isLogged) ? ($request->user()->isAdmin() || $request->user()->hasPermission('admin.access')) ? true : false  : false,
                'TwoFA' => ($isLogged) ? $request->user()->hasTwoFactorAuth() : false,
                'notifications' => ($isLogged) ? $notifications : null,
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
                'dataReset' => fn () => $request->session()->get('dataReset'),
                'result' => fn () => $request->session()->get('result')
            ],
            'csrf_token' => csrf_token()
        ]);
    }
}
