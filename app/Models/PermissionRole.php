<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $permission
 * @property int $role_id
 */
class PermissionRole extends Model
{
    private static $permissions = [
    ];

    protected $table = "permission_role";
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;



    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'permission',
    ];

    /**
     * Get the roles that has this permission.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public static function permissionsWithName()
    {
        return self::$permissions;
    }

    public static function permissions()
    {
        return array_keys(self::$permissions);
    }

    public static function registerPermissions(array $permissions)
    {
        self::$permissions = array_merge(self::$permissions, $permissions);
    }
}