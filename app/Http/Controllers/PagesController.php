<?php

namespace App\Http\Controllers;

use App\Models\Pages;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    

    public function display($slug){
        $page = Pages::where('slug', $slug)->first();
        if($page == null) abort(404);
        return Inertia::render('Pages/Display', [
            'pageData' => $page
        ]);
    }

}
