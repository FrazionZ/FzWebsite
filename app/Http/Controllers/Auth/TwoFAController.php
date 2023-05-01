<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Logger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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

        if(!$request->user()->hasTwoFactorAuth())
            return redirect()->route('2fa.register');

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

        $validator = Validator::make($request->all(), ['code' => 'required']);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Vous devez remplir touts les champs"));
        }

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

    public function disable(Request $request)
    {
        $request->user()->forceFill([
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
        ])->save();

        return redirect()->route('2fa.register')->with("status", $this->toastResponse('success', "Votre 2FA a bien été désactivé"));
    }

    public function regenerate(Request $request){
        $request->user()->forceFill([
            'two_factor_recovery_codes' => $request->user()->generateRecoveryCodes(),
        ])->save();

        return redirect()->route('2fa.index')->with("status", $this->toastResponse('success', "Vos codes ont étaient régénéré"));
    }
 
    public function login(Request $request)
    {        
        if (! $request->session()->has('login.2fa.id')) {
            return redirect()->route('login');
        }

        return Inertia::render($request->session()->get('login.2fa.isOauth') ? 'Oauth/Prompt/TwoFa' : 'Auth/TwoFA/Login', [ ]);
    }

    public function handleLogin(Request $request)
    {
        $validator = Validator::make($request->all(), ['code' => 'required', 'typeCode' => 'required']);

        $isOauth = $request->session()->get('login.2fa.isOauth');

        if ($validator->fails()) {
            if($isOauth)
                return redirect()->back()->with("status", $this->toastResponse('error', "Vous devez remplir touts les champs"));
            else
                return redirect()->back()->with("status", $this->toastResponse('error', "Vous devez remplir touts les champs"));
        }
        
        if (! $request->session()->has('login.2fa.id')) {
            if($isOauth)
                return redirect()->back();
            else
                return redirect()->route('login');
        }

        
        $redirectURL = $request->session()->get('login.2fa.redirectURL');

        $user = User::findOrFail($request->session()->get('login.2fa.id'));
        $code = $request->code;
        $typeCode = $request->typeCode;

        if ($typeCode == 0) {//CHECK 2FA FROM SERVER OPT
            if (!$user->isValidTwoFactorCode($code)) {
                $request->session()->keep('login.2fa');

                Logger::log('user.auth.login.twofa.error', null, null, $user);

                if($isOauth)
                    return redirect()->back()->with('status', $this->toastResponse('error', "Le code 2FA n'est pas correcte."));
                else
                    return redirect()->route('login')->with('status', $this->toastResponse('error', "Le code 2FA n'est pas correcte."));
            }
        }else if($typeCode == 1) {
            $codes = json_decode($user->two_factor_recovery_codes, true);
            if(!in_array($code, $codes)){
                $request->session()->keep('login.2fa');

                Logger::log('user.auth.login.twofa.error', null, null, $user);

                if($isOauth)
                    return redirect()->back()->with('status', $this->toastResponse('error', "Le code de secours n'est pas correcte."));
                else
                    return redirect()->route('login')->with('status', $this->toastResponse('error', "Le code de secours n'est pas correcte."));
            }
            $user->forceFill([
                'two_factor_recovery_codes' => $user->generateRecoveryCodes(),
            ])->save();
        }

        Auth::guard()->login($user, $request->session()->get('login.2fa.remember'));

        $request->session()->remove('login.2fa');
        $request->session()->remove('login.2fa.isOauth');
        $request->session()->remove('login.2fa.redirectURL');

        //$user->replaceRecoveryCode($code);

        if($user->uuid == null) $user->update(['uuid' => Str::uuid()]);

        Logger::log('user.auth.login.successful', null, null, $user);

        if($isOauth)
            return Inertia::location($redirectURL  . '?demandeConsent=true');
        else
            return redirect()->route('index');
    }
}
