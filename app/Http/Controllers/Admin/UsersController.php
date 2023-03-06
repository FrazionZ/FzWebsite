<?php

namespace App\Http\Controllers\Admin;

use Adrianorosa\GeoLocation\GeoLocation;
use App\Http\Controllers\Controller;
use App\Models\Logger;
use App\Models\Role;
use App\Models\RoleUser;
use App\Models\TokenUsers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Http\Request;


class UsersController extends Controller
{
    
    
    public function index(Request $request){
        $users = $this->paginateUsers($request->query('page', 0));

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function search(Request $request){
        $validator = Validator::make($request->all(), [
            'search' => 'required|string',
            'currentPage' => 'required|int',
        ]);

        if ($validator->fails()) {
            return response()->json($this->paginateUsers($request->currentPage));
        }

        return response()->json($this->paginateUsers($request->currentPage, $request->search));
    }

    public function paginateUsers($pageCurrent = 0, $search = null){
        $users = User::select('id', 'name', 'email', 'created_at')->where('name', 'LIKE', '%'.$search.'%')->paginate(
            10, ['*'], 'page', ($search !== null) ? 0 : $pageCurrent
        );
        foreach($users as $user){
            $user->role = $user->roles;
            foreach($user->role as $role){
                $role->barStyle = $role->getBadgeStyle();
            }
        }
        
        return $users;
    }

    public function edit(Request $request, $id){
        $user = User::where('id', $id)->first();

        $user->role = $user->roles;

        $rolesQuery = Role::get();
        $roles = [];
        foreach($rolesQuery as $ritem){
            if(!$user->hasRole($ritem->slug)){
                array_push($roles, $ritem);
            }
        }

        $tokenUsers = TokenUsers::where('uid', $user->id)->get();
        foreach($tokenUsers as $token){
            $token->geo = GeoLocation::lookup(base64_decode($token->ip));
        }
        
        //GET LOGGER USER
        $logger = new Logger();
        $logger = $logger->pagination(10, 'logger', $request->query('logger', 0), true, $user->id);

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'logger' => $logger,
            'authRoleHigh' => Auth::user()->getHigherRole(),
            'tokenUsers' => $tokenUsers
        ]);
    }

    public function role_attach($id, $role){
        $user = User::where('id', $id)->first();
        if($user == null) return redirect()->back()->with("status", $this->toastResponse('error', "Utilisateur introuvable"));
        $targetRole = config('roles.models.role')::where('id', '=', $role)->first();
        if($targetRole == null) return redirect()->back()->with("status", $this->toastResponse('error', "Rôle introuvable"));
        $arh = Auth::user()->getHigherRole();
        if($arh->position >= $targetRole->position && (!$arh->level >= 5)) return redirect()->back()->with("status", $this->toastResponse('error', "Impossible d'attacher un rôle égale ou supérieur à votre rôle le plus haut"));
        if($user->hasRole($targetRole->slug)) return redirect()->back()->with("status", $this->toastResponse('error', "Ce joueur a déjà ce rôle"));
        $user->attachRole($targetRole);
        Logger::log('user.role.attach', json_encode(array('role' => array('id' => $targetRole->id))), $user);
        return redirect()->back()->with("status", $this->toastResponse('success', "Rôle ajouté"));
    }

    public function role_detach($id, $role) {
        $user = User::where('id', $id)->first();
        if($user == null) return redirect()->back()->with("status", $this->toastResponse('error', "Utilisateur introuvable"));
        if(count($user->roles) == 1) return redirect()->back()->with("status", $this->toastResponse('error', "L'utilisateur n'a qu'un seul rôle, impossible de lui détacher"));
        $targetRole = config('roles.models.role')::where('id', '=', $role)->first();
        if($targetRole == null) return redirect()->back()->with("status", $this->toastResponse('error', "Rôle introuvable"));
        $arh = Auth::user()->getHigherRole();
        if($arh->position >= $targetRole->position && (!$arh->level >= 5)) return redirect()->back()->with("status", $this->toastResponse('error', "Impossible de déttacher un rôle égale ou supérieur à votre rôle le plus haut"));
        if(!$user->hasRole($targetRole->slug)) return redirect()->back()->with("status", $this->toastResponse('error', "Ce joueur n'a pas ce rôle"));
        $user->detachRole($targetRole);
        Logger::log('user.role.dettach', json_encode(array('role' => array('id' => $targetRole->id))), $user);
        return redirect()->back()->with("status", $this->toastResponse('success', "Rôle retiré"));
    }

    public function save(Request $request){
        $rules = [
            'id' => 'required|int',
            'username' => 'required|string',
            'email' => 'required|string',
            'money' => 'required|int',
            'banned' => 'required|int',
        ];

        if($request->user()->hasPermission('admin.user.money'))
            $rules['money'] = 'required|int';

        if($request->user()->hasPermission('admin.user.ban'))
            $rules['banned'] = 'required|int';

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $user = User::where('id', $request->id)->first();
        if($user == null) return redirect()->back()->with("status", $this->toastResponse('error', "Utilisateur non trouvable"));

        $updated = [
            'name' => $request->username,
            'email' => $request->email
        ];

        if($request->user()->hasPermission('admin.user.money'))
            $updated['money'] = $request->money;

        if($request->user()->hasPermission('admin.user.ban'))
            $updated['banned'] = $request->banned;

        $user->update($updated);

        return redirect()->back()->with("status", $this->toastResponse('success', "Utilisateur sauvegardé."));
    }

    public function tokenRevoke(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
            'user_id' => 'required|int',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Une erreur est survenue lor de la lecture des données"));
        }

        $token = TokenUsers::where('id', $request->id)->first();
        if($token == null) return redirect()->back()->with("status", $this->toastResponse('error', "Une erreur est survenue lor de la lecture des données"));
        if($token->uid !== $request->user_id) return redirect()->back()->with("status", $this->toastResponse('error', "Le token ciblé n'est pas celui de l'utilisateur ciblé"));
        
        $token->forceDelete();

        return redirect()->route('admin.users.edit', ["id" => $request->user_id])->with("status", $this->toastResponse('success', "Le token a bien été révoqué."));
    }



}
