<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Logger;
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
        Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ])->validate();

        $isOauth = $request->filled('isOauth');

        /*if ($validator->fails()) {
            if($isOauth)
                return redirect()
                    ->back()
                    ->withErrors($validator)
                    ->withInput()
                    ->with("status", $this->toastResponse('error', "Le formulaire est incomplet"));
            else
                return redirect(route('login'))
                    ->withErrors($validator)
                    ->withInput()
                    ->with("status", $this->toastResponse('error', "Le formulaire est incomplet"));
        }*/

        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            if($isOauth)
                return redirect()->back()->with("status", $this->toastResponse('error', "Too Many Login."));
            else
                return redirect(route('login'))->with("status", $this->toastResponse('error', "Too Many Login."));
        }

        if (! $this->guard()->once($this->credentials($request))) {
            $this->incrementLoginAttempts($request);

            //TRY REGISTER LOG
            $user_log = User::where('email', $request->email)->first();
            if($user_log !== null)
                Logger::log('user.auth.login.password', null, null, $user_log);

            if($isOauth)
                return redirect()->back()->with("status", $this->toastResponse('error', "Identifiants invalides."));
            else
                return redirect(route('login'))->with("status", $this->toastResponse('error', "Identifiants invalides."));
        }

        $user = $this->guard()->user();

        if ($user === null || $user->isDeleted()) {
            if($isOauth)
                return redirect()->back()->with("status", $this->toastResponse('error', "L'utilisatuer n'est plus valide."));
            else
                return redirect(route('login'))->with("status", $this->toastResponse('error', "L'utilisatuer n'est plus valide."));
        }

        return $this->loginUser($request, $user);
    }

    protected function loginUser(Request $request, User $user)
    {
        $isOauth = $request->input('isOauth');
        
        if ($user->isBanned()){
            if($isOauth)
                return redirect(route('login'))->with("status", $this->toastResponse('error', "Vous êtes bannis. Vous ne pouvez plus vous connecter"));
            else
                return redirect(route('login'))->with("status", $this->toastResponse('error', "Vous êtes bannis. Vous ne pouvez plus vous connecter"));
        }

        if ($user->hasTwoFactorAuth()) {
            Auth::guard('web')->logout();
            $request->session()->put('login.2fa', [
                'id' => $user->id,
                'remember' => $request->filled('remember'),
                'isOauth' => $isOauth,
                'redirectURL' => $request->redirect_url
            ]);
            
            return to_route('2fa.login', []);
        }

        $this->guard()->login($user, $request->filled('remember'));

        if($user->uuid == null) $user->update(['uuid' => Str::uuid()]);

        Logger::log('user.auth.login.successful', null, null, $user);

        if($request->isOauth){
            $request->session()->regenerate();

            $this->clearLoginAttempts($request);

            return Inertia::location($request->redirect_url . '?demandeConsent=true');
        }
        else
            return $this->sendLoginResponse($request);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Logger::log('user.auth.logout', null, null, Auth::user());

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
