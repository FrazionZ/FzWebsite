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

if (! function_exists('dateDiff')) {
    function dateDiff($date1, $date2){
        $diff = abs($date1 - $date2); // abs pour avoir la valeur absolute, ainsi éviter d'avoir une différence négative
        $retour = array();
     
        $tmp = $diff;
        $retour['second'] = $tmp % 60;
     
        $tmp = floor( ($tmp - $retour['second']) /60 );
        $retour['minute'] = $tmp % 60;
     
        $tmp = floor( ($tmp - $retour['minute'])/60 );
        $retour['hour'] = $tmp % 24;
     
        $tmp = floor( ($tmp - $retour['hour'])  /24 );
        $retour['day'] = $tmp;
     
        return $retour;
    }
}