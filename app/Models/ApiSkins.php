<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiSkins extends Model
{
    use HasFactory;

    protected $connection = 'api';
    protected $table = 'skins';

    
    protected $fillable = ['uuid', 'sha1'];

    public $timestamps = false;
}
