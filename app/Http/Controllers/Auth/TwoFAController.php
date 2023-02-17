<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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

    public function register(Request $request)
    {

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

            return redirect()->route('login');
        }

        Auth::guard()->login($user, $request->session()->get('login.2fa.remember'));

        $request->session()->remove('login.2fa');

        //$user->replaceRecoveryCode($code);

        return redirect()->route('index');
    }
}
