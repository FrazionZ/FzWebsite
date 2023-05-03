<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CapesUsers extends Model
{
    use HasFactory;

    protected $connection = "api";
    protected $table = "capes_users";

    protected $primaryKey = 'uuid';

    protected $fillable = [
        'uuid', 'cape_id'
    ];
}
