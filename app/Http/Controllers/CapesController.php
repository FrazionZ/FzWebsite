<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Capes;
use App\Models\CapesCategories;
use Inertia\Inertia;

class CapesController extends Controller
{
    
    public function index() {
        $capes = Capes::get();

        foreach($capes as $cape){
            $cape->category = CapesCategories::where('id', $cape->category)->first();
        }

        return Inertia::render('Capes/Index', [
            'capes' => $capes
        ]);
    }


}
