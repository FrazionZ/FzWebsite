<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FactionProfileSession extends Model
{
    use HasFactory;

    protected $connection = 'faction';
    protected $table = 'profile__session';

    protected $primaryKey = "uuid";

    public $timestamps = false;
}
