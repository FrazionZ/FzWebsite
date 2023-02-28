<?php

namespace App\Http\Controllers;


use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Features;
use Illuminate\Support\Facades\Artisan;
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

    public static function putConfig($name,$key,$value)
    {
        config([$name.'.'.$key => $value]);
        $fp = fopen(base_path() .'/config/'.$name.'.php' , 'w');
        fwrite($fp, '<?php return ' . var_export(config($name), true) . ';');
        fclose($fp);
        Artisan::call('cache:clear');
    }

    public function checkPerm(Request $request, $perm){
        if(!$request->user()->hasPermission($perm)) {
            dd("No perm");
            return redirect()->back()->with("status", $this->toastResponse('error', "Vous n'avez pas la permission d'exécuter cette requête"));
        }
    }

}
