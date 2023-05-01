<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuildProfile extends Model
{
    use HasFactory;

    protected $connection = 'faction';
    protected $table = "guild__profile";
}
