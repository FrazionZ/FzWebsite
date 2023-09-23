<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MicrosoftAuth extends Model
{
    use HasFactory;

    protected $table = "microsoft__auth";

    protected $fillable = ['userId', 'uuid', 'token'];

}
