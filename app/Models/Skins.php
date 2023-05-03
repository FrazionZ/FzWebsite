<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skins extends Model
{
    use HasFactory;

    protected $connection = "api";
    protected $table = "skins";

    public $timestamps = false;

    protected $fillable = [
        'uuid', 'sha1'
    ];
}
