<?php

namespace App\Http\Controllers\Social;

use App\Http\Controllers\Controller;
use App\Models\Social\Discord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Inertia\Inertia;

class DiscordController extends Controller
{
    
    private $provider;
    private $providerData;
    private $idGuildFz;

    public function __construct(){
        $this->provider = new \Wohali\OAuth2\Client\Provider\Discord([
            'clientId' => '847942487506681897',
            'clientSecret' => 'orFTgIB5mEbtcJMJ66G3TvOFRtFI9cwO',
            'redirectUri' => route('social.discord.callback'),
        ]);

        $this->providerData = new \League\OAuth2\Client\Provider\Discord([
            'clientId' => '847942487506681897',
            'clientSecret' => 'orFTgIB5mEbtcJMJ66G3TvOFRtFI9cwO',
            'redirectUri' => route('social.discord.callback'),
        ]);

        $this->idGuildFz = "636497059838558223";
    }

    public function start(Request $request){
        return Inertia::location(Socialite::driver('discord')->scopes(['identify', 'email', 'guilds'])->redirect()->getTargetUrl());
    }

    public function callback(Request $request)
    {
        if($request->has('error'))
            return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('error', 'Une erreur est survenue lors de la liaison de votre compte Discord'));
        try {
            $check = Discord::where('uid', $request->user()->id)->first();
            if($check !== null) 
                return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('error', 'Votre compte FrazionZ a déjà un compte discord lié'));
            else {
                $udiscord = Socialite::driver('discord')->user();
                Discord::create([
                    "did" => $udiscord->id,
                    "uid" => $request->user()->id,
                    "atoken" => $udiscord->token,
                    "rtoken" => $udiscord->refreshToken,
                ]);
                return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('success', 'Votre compte discord a bien été lié'));
            }
        }catch(\Exception $e){
            return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('error', 'Une erreur est survenue lors de la liaison de votre compte Discord'));
        }
        
    }

    public function get(Request $request){
        $discord = Discord::where("uid", $request->user()->id)->first();
        $userDiscord = null;
        if($discord !== null){
            $infosDiscord = json_decode($this->getDiscordInfos($discord['did']), true);
            $infosDiscordComplet = null;
            $mfa_enable = false;
            $get_infosclt = false;
            try {
                $infosDiscordComplet = Socialite::driver('discord')->userFromToken($discord->atoken);
                if($infosDiscordComplet !== null){
                    $mfa_enable = $infosDiscordComplet['mfa_enabled'];
                    $get_infosclt = true;
                }
            }catch(\Exception $e){
                return ['result' => false];
            }
            $userDiscord = ['result' => true, "id" => $infosDiscord['id'], "username" => $infosDiscord['username']."#".$infosDiscord['discriminator'], "get_infosclt" => $get_infosclt, "mfa_enable" => $mfa_enable, "avatar" => "https://cdn.discordapp.com/avatars/".$infosDiscord['id']."/".$infosDiscord['avatar'].".webp?size=64"];
        }
        
        return ($userDiscord !== null) ? $userDiscord : ['result' => false];
    }

    public function refreshAllToken()
    {
        $date = new \DateTime(now());
        $date->setTimezone(new \DateTimeZone('Europe/Paris'));
        $usdiscord = Discord::get();
        foreach($usdiscord as $u){
            try {
                $udiscord = $this->provider->getAccessToken('refresh_token', [
                    'refresh_token' => $u->rtoken
                ]);
                
                Model::unguard();
                $u->update(["atoken" => $udiscord->getToken(), "rtoken" => $udiscord->getRefreshToken(),  "updated_at" => $date]);
                Model::reguard();
            } catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                $u->delete();
                continue;
            }
        }
        return response()->json("refresh complete.");
    }

    public function unlink(Request $request)
    {
        $discord = Discord::where('uid', $request->user()->id);
        if($discord == null)
            return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('error', 'Une erreur s\'est produite'));
        
        $discord->delete();
        return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('success', 'Votre compte discord a bien été délié'));
    }

    public function getDiscordInfos($idDiscord){
        $url = "https://discord.com/api/v9/users/".$idDiscord;
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $headers = array(
            "Accept: application/json",
            "Authorization: Bot ODQ3OTQyNDg3NTA2NjgxODk3.YLFZ-w.WBHXQqWkNYVTBJ9Q3Xoe2l3YUm4",
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        $resp = curl_exec($curl);
        curl_close($curl);
        return $resp;
    }

}
