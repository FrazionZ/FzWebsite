<?php

namespace App\Models\Forum;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use jeremykenedy\LaravelRoles\Traits\HasRoleAndPermission;

class ForumSubcategories extends Model
{
    use HasFactory, HasRoleAndPermission;
    protected $table = "forum__subcategories";
    protected $fillable = ['name', 'position'];

    private $isAllowedCreated = true;

    public function roles()
    {
        $scRoles = ForumSubcategoriesRoles::where('forum_sc_id', $this->id)->get();
        foreach($scRoles as $scr){
            $scr->data = Role::where('id', $scr['role_id'])->first()->toArray();
            $scr->isAllowed = $scr->isAllowed();
        }
        return $scRoles;
    }

    public function isAllowedParent()
    {
        $scRoles = ForumSubcategoriesRoles::where('forum_sc_id', $this->id)->get();
        foreach($scRoles as $scr){
            $this->isAllowedCreated = $scr->isAllowed();
            break;
        }
        return $this->isAllowedCreated;
    }
}
