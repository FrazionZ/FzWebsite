<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PagesController extends Controller
{
    

    public function index(Request $request){
        $pages = Pages::get();
        return Inertia::render('Admin/Pages/Index', ['pages' => $pages]);
    }

    public function edit($id){
        $page = Pages::where('id', $id)->first();
        if($page == null) abort(404);
        return Inertia::render('Admin/Pages/Edit', [
            'pageData' => $page
        ]);
    }

    public function update(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
            'title' => 'required|string',
            'slug' => 'required|string',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $page = Pages::where('id', $request->id)->first();
        if($page == null) return redirect()->back()->with("status", $this->toastResponse('error', "Erreur lors de la lecture des données"));
        $content = base64_encode($request->content);
        
        $page->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'content' => $content,
            'updated_at' => now()
        ]);

        return redirect()->route('admin.pages.index')->with("status", $this->toastResponse('success', "Mise à jour de la page avec succès"));

    }

}
