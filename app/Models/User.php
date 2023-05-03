<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use jeremykenedy\LaravelRoles\Traits\HasRoleAndPermission;
use Laravel\Passport\HasApiTokens;
use App\Models\Traits\TwoFactorAuthenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoleAndPermission, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'email_verified_at',
        'password',
        'uuid',
        'money',
        'banned',
        'isSlim',
        'two_factor_secret'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function hasTwoFactorAuth()
    {
        return $this->two_factor_secret !== null;
    }

    public function isBanned()
    {
        return $this->banned === 1;
    }

    public static function getRole($userID)
    {
        $roleUser = RoleUser::where('user_id', $userID)->first();
        $roleUserID = Role::defaultRoleId();
        if($roleUser !== null) $roleUserID = $roleUser->role_id;
        $role =  Role::select('id', 'name', 'color')->where('id', $roleUserID)->first();
        return $role->toArray();
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function getHigherRole()
    {
        $roleParent = null;
        foreach($this->getRoles() as $role){
            if($roleParent == null)
                $roleParent = $role;
            else if($roleParent->position > $role->position)
                $roleParent = $role;
        }
        $roleParent->badgeStyle = $roleParent->getBadgeStyle();
        return $roleParent;
    }

    public function isPCodeEnable()
    {
        return ($this->pcode_state == 1);
    }
}
