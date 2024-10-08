<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Logger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\Config;

class MaintenanceController extends Controller
{
    

    public function index(Request $request){
        $mtEnabled = Config::get('maintenance.state', false);
        $mtMessage = Config::get('maintenance.message', '');
        return Inertia::render('Admin/Maintenance/Index', [
            'message' => $mtMessage,
            'enabled' => $mtEnabled
        ]);
    }

    public function handleSubmit(Request $request){

        $validator = Validator::make($request->all(), [
            'enabled' => 'required|boolean',
        ]);

        $originMessage = base64_decode(Config::get('maintenance.message', ''));

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Vous devez remplir touts les champs"));
        }

        if($request->enabled)
            if($request->message == "")
                return redirect()->back()->with("status", $this->toastResponse('error', "Vous devez indiquer un message de maintenance !"));

        if($request->message !== "")
            Config::set('maintenance.message', base64_encode($request->message));

        $finalMessage = base64_decode(Config::get('maintenance.message', ''));

        if($originMessage !== $finalMessage)
            Logger::log('system.maintenance.message', null);

        Config::set('maintenance.state', $request->enabled);

        //system.maintenance.enabled
        $boolLog = ($request->enabled) ? 'system.maintenance.enabled' : 'system.maintenance.disabled';
        Logger::log($boolLog, null);

        return redirect()->back()->with("status", $this->toastResponse('success', "Sauvegarde terminée"));

    }

}
