<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Forum\ForumCategories;
use App\Models\Forum\ForumSubcategories;
use App\Models\Forum\ForumSubcategoriesRoles;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ForumController extends Controller
{
    

    public function categories_index(){
        $forumCategories = ForumCategories::get();
        return Inertia::render('Admin/Forum/Categories/Index', [
            'forumCategories' => $forumCategories
        ]);
    }

    public function category_edit($id){
        $forumCategory = ForumCategories::where('id', $id)->first();
        $forumCategory->subcategories = ForumSubcategories::where('parent_id', $forumCategory->id)->orderBy('position', 'ASC')->get();
        return Inertia::render('Admin/Forum/Categories/Edit', [
            'forumCategory' => $forumCategory
        ]);
    }

    public function subcategory_edit($id){
        $forumSubcategory = ForumSubcategories::where('id', $id)->first();
        $forumSubcategory->roles = $forumSubcategory->roles();
        $rolesQuery = Role::select('name', 'slug', 'id')->get();
        $roles = [];
        foreach($rolesQuery as $ritem){
            $checkRole = ForumSubcategoriesRoles::where('forum_sc_id', '=', $id)->where('role_id', $ritem->id)->first();
            if($checkRole == null) array_push($roles, $ritem);
        }
        return Inertia::render('Admin/Forum/SubCategories/Edit', [
            'forumSubcategory' => $forumSubcategory,
            'roles' => $roles
        ]);
    }

    public function subcategory_role_attach(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
            'role' => 'required|int'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $fsc = ForumSubcategories::where('id', $request->id)->first();
        if($fsc == null) return redirect()->back()->with("status", $this->toastResponse('error', "Sous catégorie introuvable"));
        $targetRole = config('roles.models.role')::where('id', '=', $request->id)->first();
        if($targetRole == null) return redirect()->back()->with("status", $this->toastResponse('error', "Rôle introuvable"));
       
        ForumSubcategoriesRoles::create([
            'forum_sc_id' => $request->id,
            'role_id' => $request->role
        ]);

        return redirect()->back()->with("status", $this->toastResponse('success', "Rôle ajouté"));
    }

    public function subcategory_role_detach(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
            'role' => 'required|int'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $fsc = ForumSubcategories::where('id', $request->id)->first();
        if($fsc == null) return redirect()->back()->with("status", $this->toastResponse('error', "Sous catégorie introuvable"));
        $targetRole = config('roles.models.role')::where('id', '=', $request->id)->first();
        if($targetRole == null) return redirect()->back()->with("status", $this->toastResponse('error', "Rôle introuvable"));
       
        $fsc = ForumSubcategoriesRoles::where('forum_sc_id', $request->id)->where('role_id', $request->role)->delete();
        if($fsc == null) return redirect()->back()->with("status", $this->toastResponse('error', "Erreur lors de la lecture des données"));
        

        return redirect()->back()->with("status", $this->toastResponse('success', "Rôle déttaché"));
    }
    public function category_save(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $fc = ForumCategories::where('id', $request->id)->first();
        if($fc == null) return redirect()->back()->with("status", $this->toastResponse('error', "Erreur lors de la lecture des données"));

        $fc->update([
            'name' => $request->name,
            'updated_at' => now()
        ]);

        return redirect()->back()->with("status", $this->toastResponse('success', "Mise à jour terminée"));


    }

    public function categories_swap(Request $request){
        $validator = Validator::make($request->all(), [
            'categories' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $categories = array_filter($request->categories, function($v, $k) {
            return $v !== null;
        }, ARRAY_FILTER_USE_BOTH);

        foreach($categories as $category){
            $targetCategory = ForumCategories::where('id', $category['id'])->first();
            $targetCategory->update(['position' => $category['position']]);
        }

        
        return redirect()->back()->with("status", $this->toastResponse('success', "L'ordre des catégories a bien été mis à jour"));
    }

    public function subcategories_swap(Request $request){
        $validator = Validator::make($request->all(), [
            'subcategories' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $subcategories = array_filter($request->subcategories, function($v, $k) {
            return $v !== null;
        }, ARRAY_FILTER_USE_BOTH);

        foreach($subcategories as $subcategory){
            $targetSubcategory = ForumSubcategories::where('id', $subcategory['id'])->first();
            $targetSubcategory->update(['position' => $subcategory['position']]);
        }

        
        return redirect()->back()->with("status", $this->toastResponse('success', "L'ordre des sous catégories a bien été mis à jour"));
    }


}
