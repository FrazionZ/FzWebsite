<?php

namespace App\Http\Controllers\Admin;

use App\Models\RoleUser;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use jeremykenedy\LaravelRoles\Models\Permission;

class RolesController extends Controller
{
    

    public function index(Request $request){
        $roles = Role::get();
        foreach($roles as $role){
            $role->users = RoleUser::where('role_id', $role->id)->count();
            $role->barStyle = $role->getBadgeStyle();
        }
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles
        ]);
    }

    public function edit($id){
        $role = Role::where('id', $id)->first();
        $role->users = RoleUser::where('role_id', $role->id)->count();
        $role->barStyle = $role->getBadgeStyle();

        $permissions = Permission::get();
        foreach($permissions as $perm){
            $perm->hasCheck = false;
            foreach($role->permissions()->get() as $rperm){
                if($rperm->permission_id == $perm->id){
                    $perm->hasCheck = true;
                    break;
                }
            }
        }

        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
            'name' => 'required|string',
            'color' => 'required|string',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $role = Role::where('id', $request->id)->first();
        if($role == null) return redirect()->back()->with("status", $this->toastResponse('error', "Rôle non trouvable"));

        $role->update([
            'name' => $request->name,
            'color' => $request->color,
            'description' => $request->description
        ]);

        return redirect()->back()->with("status", $this->toastResponse('success', "Rôle sauvegardé."));
    }

}
