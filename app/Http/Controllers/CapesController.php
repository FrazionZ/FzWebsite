<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Capes;
use Inertia\Inertia;

class CapesController extends Controller
{
    
    public function index() {
        $capes = Capes::get();

        return Inertia::render('Capes/Index', [
            'capes' => $capes
        ]);
    }


}
