<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use \Illuminate\Support\Str;

class AuthenticatedSessionController extends Controller
{
    
    
    use AuthenticatesUsers;

    
    protected $redirectTo = RouteServiceProvider::HOME;

    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect(route('login'))
                        ->withErrors($validator)
                        ->withInput()
                        ->with("status", $this->toastResponse('error', "Le formulaire est incomplet"));
        }

        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return redirect(route('login'))->with("status", $this->toastResponse('error', "Too Many Login."));
        }

        if (! $this->guard()->once($this->credentials($request))) {
            $this->incrementLoginAttempts($request);
            return redirect(route('login'))->with("status", $this->toastResponse('error', "Identifiants invalides."));
        }

        $user = $this->guard()->user();

        if ($user === null || $user->isDeleted()) {
            return redirect(route('login'))->with("status", $this->toastResponse('error', "L'utilisatuer n'est plus valide."));
        }

        return $this->loginUser($request, $user);
    }

    protected function loginUser(Request $request, User $user)
    {

        if ($user->isBanned()){
            return redirect(route('login'))->with("status", $this->toastResponse('error', "Vous êtes bannis. Vous ne pouvez plus vous connecter"));
        }

        if ($user->hasTwoFactorAuth()) {
            Auth::guard('web')->logout();
            $request->session()->put('login.2fa', [
                'id' => $user->id,
                'remember' => $request->filled('remember'),
            ]);
            return to_route('2fa.login', []);
        }

        $this->guard()->login($user, $request->filled('remember'));

        if($user->uuid == null) $user->update(['uuid' => Str::uuid()]);

        return $this->sendLoginResponse($request);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
