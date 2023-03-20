<?php

namespace App\Models\Forum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;

class ForumSubcategoriesRoles extends Model
{
    use HasFactory;
    protected $table = "forum__subcategories_roles";
    protected $fillable = ['forum_sc_id', 'role_id'];
    protected $primaryKey = 'forum_sc_id';


    public function subcategorie()
    {
        return $this->belongsToMany(ForumSubcategories::class);
    }

    public function isAllowed(){
        $role = Role::select('id', 'name', 'slug', 'level')->where('id', $this->role_id)->first();
        if($role == null) return false;
        return Auth::user()->hasRole($role->slug);
    }
    
    
}
