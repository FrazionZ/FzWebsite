<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Features;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function featuresEnable($key) {
        $features = Features::where('key', '=', $key)->first();
        if($features == null) return false;
        return $features->state;
    }

    public function toastResponse($type, $message){
        return ["type" => $type, "msg" => $message];
    }

}
