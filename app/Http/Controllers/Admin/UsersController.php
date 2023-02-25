<?php

namespace App\Http\Controllers\Admin;

use Adrianorosa\GeoLocation\GeoLocation;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\RoleUser;
use App\Models\TokenUsers;
use App\Models\User;
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
        foreach($users as $user)
            $user->role = User::getRole($user->id);
        
        return $users;
    }

    public function edit($id){
        $user = User::where('id', $id)->first();
        $user->role = User::getRole($user->id);
        $roles = Role::get();

        $tokenUsers = TokenUsers::where('uid', $user->id)->get();
        foreach($tokenUsers as $token){
            $token->geo = GeoLocation::lookup(base64_decode($token->ip));
        }

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'tokenUsers' => $tokenUsers
        ]);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
            'username' => 'required|string',
            'email' => 'required|string',
            'money' => 'required|int',
            'banned' => 'required|int',
            'role' => 'required|int',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $user = User::where('id', $request->id)->first();
        if($user == null) return redirect()->back()->with("status", $this->toastResponse('error', "Utilisateur non trouvable"));

        $user->update([
            'name' => $request->username,
            'email' => $request->email,
            'money' => $request->money,
            'banned' => $request->banned,
        ]);

        //ROLE CREATED OR UPDATE
        $roleUser = RoleUser::where('user_id', $user->id)->first();
        $roleInput = [
            "role_id" => $request->role,
            "user_id" => $user->id
        ];
        if($roleUser == null)
            RoleUser::insert($roleInput);
        else
            $roleUser->update($roleInput);

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
