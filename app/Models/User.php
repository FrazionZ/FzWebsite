<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use jeremykenedy\LaravelRoles\Traits\HasRoleAndPermission;
use Laravel\Sanctum\HasApiTokens;
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
        'password',
        'uuid',
        'money',
        'banned',
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
        'two_factor_secret'
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
}
