<?php

use Illuminate\Http\Request;
use Ixudra\Curl\Facades\Curl;

if (! function_exists('guser')) {
    function guser(Request $request) {
        return \Request::get('guser');
    }
}

if (!function_exists('grequest')) {
    function grequest($endpoints, $guser){
        $apiURL = 'https://api.github.com'.$endpoints;
        $response = Curl::to($apiURL)
            ->withHeaders( array( 'org' => 'FrazionZ', 'X-OAuth-Scopes' => 'repo, user', 'User-Agent' => 'Awesome-Octocat-App' ) )
            ->withBearer($guser->token)
            ->get();
        return json_decode($response);
    }
}