<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Logger;
use App\Models\User;

class LoggerController extends Controller
{

    public function index(Request $request){
        $logger = new Logger();
        $logger = $logger->pagination(10, 'page', $request->query('page', 0));
        return Inertia::render('Admin/Logger/Index', [
            'logger' => $logger
        ]);
    }

}
