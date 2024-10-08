<?php

namespace App\Models;

use App\Casts\Color;
use App\Models\Traits\Searchable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $color
 * @property int $level
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Illuminate\Support\Collection|\Azuriom\Models\User[] $users
 * @property \Illuminate\Support\Collection|\Azuriom\Models\Permission[] $permissions
 *
 * @method static \Illuminate\Database\Eloquent\Builder admin()
 */
class Role extends Model
{
    use HasFactory;
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'color', 'level', 'is_admin', 'position'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'color' => Color::class,
        'is_admin' => 'boolean',
    ];

    /**
     * The attributes that can be search for.
     *
     * @var array
     */
    protected $searchable = [
        'name',
    ];

    /**
     * Get the users in this group.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get navbar elements attached to this role.
     */
    public function navbarElements()
    {
        return $this->belongsToMany(NavbarElement::class);
    }

    /**
     * The permission that this role have.
     */
    public function permissions()
    {
        return $this->hasMany(PermissionRole::class);
    }

    public function rawPermissions()
    {
        return $this->permissions->pluck('permission');
    }

    public function hasPermission($permission)
    {
        return $this->is_admin || $this->hasRawPermission($permission);
    }

    public function hasRawPermission(string $permission)
    {
        return $this->permissions->contains('permission', $permission);
    }

    public function syncPermissions(array $newPermissions, bool $remove = true)
    {
        $permissions = $this->rawPermissions();

        // Create the new permissions
        foreach (array_diff($newPermissions, $permissions->all()) as $permission) {
            $this->permissions()->create(['permission' => $permission]);
        }

        if ($remove) {
            // Delete the removed permissions
            $removedPermissions = $permissions->diff($newPermissions);
            $this->permissions()->whereIn('permission', $removedPermissions)->delete();
        }
    }

    public function color_contrast(string $hex)
    {
        $r = hexdec(substr($hex, 1, 2));
        $g = hexdec(substr($hex, 3, 2));
        $b = hexdec(substr($hex, 5, 2));
        $yiq = (($r * 299) + ($g * 587) + ($b * 114)) / 1000;

        return ($yiq >= 128) ? 'black' : 'white';
    }

    /**
     * Get the CSS inline style rules of this role.
     * The background color is the role color and the text
     * color is white or black depending on the role color.
     *
     * @return array<string>
     */
    public function getBadgeStyle()
    {
        $color = self::color_contrast($this->color);

        return ["color" => $color, "background" => $this->color];
    }

    /**
     * Return true if this role is the default role.
     * The role created by the application with the id 1
     * is always the default role that new users will get
     * when they will register.
     *
     * @return bool
     */
    public function isDefault()
    {
        return $this->id === self::defaultRoleId();
    }

    /**
     * Get the default role.
     *
     * @return \Azuriom\Models\Role
     */
    public static function defaultRole()
    {
        return self::find(self::defaultRoleId());
    }

    /**
     * Get the default role id.
     *
     * @return int
     */
    public static function defaultRoleId()
    {
        return (int) Config::get('role.default', 1);
    }

    /**
     * Scope a query to only include admin roles.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAdmin(Builder $query)
    {
        return $query->where('is_admin', true);
    }
}