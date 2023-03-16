<?php

namespace App\Models\Social;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discord extends Model
{
    use HasFactory;

    protected $table = "social__discord";

    protected $fillable = ['did', 'uid', 'atoken', 'rtoken'];

}
