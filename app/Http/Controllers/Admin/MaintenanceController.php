<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Config;

class MaintenanceController extends Controller
{
    

    public function index(Request $request){
        $mtMessage = Config::get('frazionz.maintenance.message');
        $mtEnabled = Config::get('frazionz.maintenance.enabled');
        return Inertia::render('Admin/Maintenance/Index', [
            'message' => $mtMessage,
            'enabled' => $mtEnabled
        ]);
    }

    public function handleSubmit(Request $request){

        $validator = Validator::make($request->all(), [
            'enabled' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Vous devez remplir touts les champs"));
        }

        if($request->enabled)
            if($request->message == "")
                return redirect()->back()->with("status", $this->toastResponse('error', "Vous devez indiquer un message de maintenance !"));

        if($request->message !== "")
            $this->putConfig('frazionz', 'maintenance.message', base64_encode($request->message));

        $this->putConfig('frazionz', 'maintenance.enabled', $request->enabled);

        return redirect()->back()->with("status", $this->toastResponse('success', "Sauvegarde terminée"));

    }

}
