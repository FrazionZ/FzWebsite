<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Logger;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Response;
use PragmaRX\Google2FA\Google2FA;
use Illuminate\Validation\ValidationException;
use App\Support\QrCodeRenderer;
use Illuminate\Support\HtmlString;
class TwoFAController extends Controller
{ 

    public function index(Request $request) {
        return Inertia::render('Auth/TwoFA/Index', []);
    }

    public function register(Request $request)
    {

        if($request->user()->hasTwoFactorAuth())
            return redirect()->route('2fa.index');

        $google2fa = new Google2FA();

        $secret = $google2fa->generateSecretKey(); 

        if($request->session()->has('2fa.secret'))
            $secret = $request->session()->get('2fa.secret');

        $qrCodeUrl = $google2fa->getQRCodeUrl(
            config('app.name'),
            $request->user()->email,
            $secret
        );

        $request->session()->put('2fa.secret', $secret);

        $qrCode = new HtmlString(QrCodeRenderer::render($qrCodeUrl, 250));
        
        return Inertia::render('Auth/TwoFA/Register', [
            'qrCode' =>  $qrCode->toHtml(), 
            'secret' => $secret
        ]);
    }

    public function enable(Request $request)
    {
        $this->validate($request, [
            'code' => ['required', 'string'],
        ]);

        if ($request->user()->hasTwoFactorAuth()) {
            return redirect()->route('profile.index');
        }

        $code = str_replace(' ', '', $request->input('code'));
        $secret = $request->session()->get('2fa.secret');

        if (! $secret || ! (new Google2FA())->verifyKey($secret, $code)) {
            return redirect()->route('2fa.register');
        }

        $request->user()->forceFill([
            'two_factor_secret' => $secret,
            'two_factor_recovery_codes' => $request->user()->generateRecoveryCodes(),
        ])->save();

        return redirect()->route('profile.index');
    }
 
    public function login(Request $request)
    {        
        if (! $request->session()->has('login.2fa.id')) {
            return redirect()->route('login');
        }

        return Inertia::render('Auth/TwoFA/Login', [  ]);
    }

    public function handleLogin(Request $request)
    {
        $this->validate($request, ['code' => 'required']);

        if (! $request->session()->has('login.2fa.id')) {
            return redirect()->route('login');
        }

        $user = User::findOrFail($request->session()->get('login.2fa.id'));
        $code = $request->input('code');

        if (! $user->isValidTwoFactorCode($code)) {
            $request->session()->keep('login.2fa');

            Logger::log('user.auth.login.twofa.error', null, null, $user);

            return redirect()->route('login');
        }

        Auth::guard()->login($user, $request->session()->get('login.2fa.remember'));

        $request->session()->remove('login.2fa');

        //$user->replaceRecoveryCode($code);

        if($user->uuid == null) $user->update(['uuid' => Str::uuid()]);

        Logger::log('user.auth.login.successful', null, null, $user);

        return redirect()->route('index');
    }
}
