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


if (! function_exists('str_without_accents')) {
    function str_without_accents($str, $charset='utf-8')
    {
        $str = htmlentities($str, ENT_NOQUOTES, $charset);

        $str = preg_replace('#&([A-za-z])(?:acute|cedil|caron|circ|grave|orn|ring|slash|th|tilde|uml);#', '\1', $str);
        $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str); // pour les ligatures e.g. '&oelig;'
        $str = preg_replace('#&[^;]+;#', '', $str); // supprime les autres caractères

        return $str;   // or add this : mb_strtoupper($str); for uppercase :)
    }
}