<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use App\Models\Role;
use App\Models\RoleUser;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'captcha' => 'required|captcha',
            'confirm_cguv' => 'accepted'
        ]);

        if ($validator->fails()) {
            return redirect(route('register'))
                        ->withErrors($validator)
                        ->withInput()
                        ->with("status", $this->toastResponse('error', "Le formulaire est incomplet"));
        }

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'two_factor_secret' => $request->two_factor_secret,
        ]);

        $user = config('roles.models.defaultUser')::find($user->id);
        $user->attachRole(Role::defaultRole());

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    public function register(Request $request)
    {

        $google2fa = app('pragmarx.google2fa');

        $registration_data["two_factor_secret"] = $google2fa->generateSecretKey();
        $request->session()->flash('registration_data', $registration_data);

        $QR_Image = $google2fa->getQRCodeInline(
            config('app.name'),
            $request->user()->email,
            $registration_data['two_factor_secret']
        );

        return Inertia::render('Auth/TwoFA/Register', [
            'QR_Image' => $QR_Image,
            'secret' => $registration_data['two_factor_secret']
        ]);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function completeRegistration(Request $request)
    {

    }
}
