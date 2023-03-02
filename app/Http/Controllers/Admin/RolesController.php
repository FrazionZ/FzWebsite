<?php

namespace App\Http\Controllers\Admin;

use App\Models\RoleUser;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use jeremykenedy\LaravelRoles\Models\Permission;

class RolesController extends Controller
{
    

    public function index(Request $request){
        $roles = Role::orderBy('position', 'asc')->get();
        foreach($roles as $role){
            $role->users = RoleUser::where('role_id', $role->id)->count();
            $role->barStyle = $role->getBadgeStyle();
        }


        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'authRoleHigh' => $request->user()->getHigherRole()
        ]);
    }

    public function edit($id){
        $role = Role::where('id', $id)->first();
        if($role == null) abort(404);

        $highRole = Auth::user()->getHigherRole();
        if($highRole->position >= $role->position) abort(401);

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

    
    public function swap(Request $request){
        $validator = Validator::make($request->all(), [
            'roles' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $roles = array_filter($request->roles, function($v, $k) {
            return $v !== null;
        }, ARRAY_FILTER_USE_BOTH);

        foreach($roles as $role){
            $targetRole = Role::where('id', $role['id'])->first();
            $targetRole->update(['position' => $role['position']]);
        }

        
        return redirect()->back()->with("status", $this->toastResponse('success', "L'ordre des rôles a bien été mis à jour"));
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

        $highRole = Auth::user()->getHigherRole();
        if($highRole->position >= $role->position) return redirect()->back()->with("status", $this->toastResponse('error', "Vous n'avez pas le droit de faire cette requête !"));

        $role->update([
            'name' => $request->name,
            'color' => $request->color,
            'description' => $request->description
        ]);

        return redirect()->back()->with("status", $this->toastResponse('success', "Rôle sauvegardé."));
    }

    public function perms(Request $request){
        $validator = Validator::make($request->all(), [
            'role_id' => 'required|int',
            'permissions' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "La requête est invalide ou incomplet"));
        }

        $role = config('roles.models.role')::find($request->role_id);
        if($role == null) return redirect()->back()->with("status", $this->toastResponse('error', "Rôle non trouvable"));

        $highRole = Auth::user()->getHigherRole();
        if($highRole->position >= $role->position) return redirect()->back()->with("status", $this->toastResponse('error', "Vous n'avez pas le droit de faire cette requête !"));

        foreach($request->permissions as $perm){
            if($perm['hasCheck'])
                $role->attachPermission($perm['id']);
            else
                $role->detachPermission($perm['id']);
        }

        return redirect()->back()->with("status", $this->toastResponse('success', "Permissions sauvegardé."));
    }


}
