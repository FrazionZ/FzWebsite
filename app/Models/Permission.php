<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    private static $permissions = [
    ];

    protected $table = "permissions";

}