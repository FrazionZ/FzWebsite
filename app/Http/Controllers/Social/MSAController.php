<?php

namespace App\Http\Controllers\Social;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\MicrosoftAuth;
use Inertia\Inertia;
use Laravel\Socialite\Two\InvalidStateException;

class MSAController extends Controller
{

    public function start(Request $request){
        if($request->user()->uuid != null) return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('error', 'Vous avez déjà un compte Microsoft lié'));
        return Socialite::driver('minecraft')->redirect();
    }

    public function callback(Request $request){
        try {
            $userProfile = Socialite::with('minecraft')->user();
            $request->user()->forceFill([
                'uuid' => $userProfile->id,
            ])->save();
            if($userProfile != null) {
                $profile = Socialite::driver('minecraft')->getProfileMinecraft($userProfile->id);
                $request->session()->put('msa', $profile);
            }
            return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('success', 'Votre compte Minecraft a bien été lié'));
        }catch(InvalidStateException $e) {
            return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('error', $e->getMessage()));
        }

    }

}
