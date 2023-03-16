<?php

namespace App\Http\Controllers\Social;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use romanzipp\Twitch\Twitch;
use romanzipp\Twitch\Objects\AccessToken;

class TwitchController extends Controller
{
    
    
    private $twitch;

    public function __construct()
    {
        $this->twitch = new Twitch;
    }

    public function start()
    {
        return Inertia::location($this->twitch->getOAuthAuthorizeUrl('code', ['user_read']));
    }

    public function callback(Request $request)
    {
        if(!$request->has('code'))
            return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('error', 'Une erreur est survenue lors de la liaison de votre compte Twitch'));
        $token = $this->twitch->getOAuthToken($request->input('code'));
        $token = (array) $token->data();
        $userId = $this->requestUserId($token['access_token']);
        $token['user_id'] = $userId->user_id;
        $exist = \App\Models\Social\Twitch::where('uid', '=', $request->user()->id)->first();
        if($exist == null){
            \App\Models\Social\Twitch::create([
                "userIdTwitch" => $token['user_id'],
                "uid" => $request->user()->id,
                "access_token" => $token['access_token'],
                "refresh_token" => $token['refresh_token'],
                "expiresIn" => $token['expires_in'],
            ]);
        }else{
            $exist->update(["access_token" => $token['access_token'], "refresh_token" => $token['refresh_token'],  "updated_at" => now()]);
        }
        return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('success', 'Votre compte twitch a bien été lié'));
    }

    public function get(Request $request)
    {
        $twitch = \App\Models\Social\Twitch::where("uid", $request->user()->id)->first();
        $userModel = new \App\Models\User;
        $userTwitch = [];
        $isExpiredLogged = false;
        if($twitch !== null){
            $accessTokenObj = new AccessToken(['access_token' => $twitch->access_token, 'expires_in' => $twitch->expiresIn, 'token_type' => 'access_token']);
            if($accessTokenObj->isExpired())
                $isExpiredLogged = true;
            else
                $userTwitch = $this->requestUserDatas($accessTokenObj->accessToken, $twitch->userIdTwitch);
        }
        
        return response()->json(["iuser" => $userTwitch->data[0], "isExpiredLogged" => $isExpiredLogged]);
    }

    public function unlink(Request $request)
    {
        $twitch = \App\Models\Social\Twitch::where('uid', $request->user()->id);
        if($twitch == null)
            return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('error', 'Une erreur s\'est produite'));
        
        $twitch->delete();
        return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('success', 'Votre compte twitch a bien été délié'));
    }

    function requestUserId($token) {
        $ch = curl_init('https://id.twitch.tv/oauth2/validate');
        $authorization = "Authorization: Bearer ".$token;
        curl_setopt($ch, CURLOPT_HTTPHEADER, array($authorization ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result);
    }

    function requestUserDatas($token, $userId) {
        $ch = curl_init('https://api.twitch.tv/helix/users?id='.$userId);
        $authorization = "Authorization: Bearer ".$token;
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Client-Id: '.config('twitch-api.client_id', ""), $authorization ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result);
    }


}
