<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AdminController extends Controller
{

    public function index(Request $request){
        $countUser = User::count();
        return Inertia::render('Admin/Index', [
            'countUser' => $countUser
        ]);
    }

}
