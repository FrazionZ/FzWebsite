<?php

namespace App\Http\Controllers\Social;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use romanzipp\Twitch\Twitch;
use romanzipp\Twitch\Objects\AccessToken;
use romanzipp\Twitch\Enums\GrantType;

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

        if(isset($userTwitch->status)) return response()->json(["result" => false]);
        
        return response()->json(["iuser" => $userTwitch->data[0], "result" => true, "isExpiredLogged" => $isExpiredLogged]);
    }

    public function refreshAllToken()
    {
        $ustwitch = \App\Models\Social\Twitch::get();
        foreach($ustwitch as $u){
            try {
                $untwitch = $this->twitch->getOAuthToken($u->refresh_token, GrantType::REFRESH_TOKEN, ['user_read']);
                $dataTwitch = $untwitch->data();
                $u->update(["access_token" => $dataTwitch->access_token, "refresh_token" => $dataTwitch->refresh_token,  "updated_at" => now()]);
            } catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                $u->delete();
                continue;
            }
        }
        return response()->json("refresh complete.");
    }

    public function unlink(Request $request)
    {
        $twitch = \App\Models\Social\Twitch::where('uid', $request->user()->id)->first();
        if($twitch == null)
            return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('error', 'Une erreur s\'est produite'));
        
        $twitch->delete();
        return redirect(route('profile.index').'?fastMenu=6')->with('status', $this->toastResponse('success', 'Votre compte twitch a bien été délié'));
    }

    public function index(Request $request)
    {
        $twitch = \App\Models\Social\Twitch::get();
        $channels = [];
        foreach($twitch as $channel) {
            $accessTokenObj = new AccessToken(['access_token' => $channel->access_token, 'expires_in' => $channel->expiresIn, 'token_type' => 'access_token']);
            if(!$accessTokenObj->isExpired()){
                $userTwitch['data'] = $this->requestUserDatas($accessTokenObj->accessToken, $channel->userIdTwitch);
                $userTwitch['data'] = $userTwitch['data']->data[0];
                $userTwitch['stream'] = $this->streamData($accessTokenObj->accessToken, $channel->userIdTwitch);
                array_push($channels, $userTwitch);
            }
        }
        return Inertia::render('Twitch/Index', [
            'channels' => $channels
        ]);
    }

    public function watch(Request $request)
    {
        $twitch = \App\Models\Social\Twitch::where('uid', $request->user()->id)->first();
        if($twitch == null)
            return redirect(route('twitch.index'))->with('status', $this->toastResponse('error', 'L\'utilisateur n\'a pas lié sa chaîne ou le compte n\'existe pas'));
        $accessTokenObj = new AccessToken(['access_token' => $twitch->access_token, 'expires_in' => $twitch->expiresIn, 'token_type' => 'access_token']);
        $userTwitch['data'] = null;
        $userTwitch['stream'] = null;
        if(!$accessTokenObj->isExpired()){
            $userTwitch['data'] = $this->requestUserDatas($accessTokenObj->accessToken, $twitch->userIdTwitch);
            $userTwitch['data'] = $userTwitch['data']->data[0];
            $userTwitch['stream'] = $this->streamData($accessTokenObj->accessToken, $twitch->userIdTwitch);
        }else
            return redirect(route('twitch.index'))->with('status', $this->toastResponse('error', 'Impossible de récuperer les données de la chaîne :\'('));
        return Inertia::render('Twitch/Watch', [
            'userTwitch' => $userTwitch
        ]);
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

    function streamData($token, $userId) {
        $ch = curl_init('https://api.twitch.tv/helix/streams?type=live&user_id='.$userId);
        $authorization = "Authorization: Bearer ".$token;
        $clientID = 'Client-Id: 2rlyh4f7k4f0gv3jyds1p3jxmk7fyy';
        curl_setopt($ch, CURLOPT_HTTPHEADER, array($authorization, $clientID));
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
