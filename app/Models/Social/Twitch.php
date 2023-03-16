<?php

namespace App\Models\Social;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Twitch extends Model
{
    use HasFactory;
    protected $table = "social__twitch";

    protected $fillable = ['uid', 'userIdTwitch', 'access_token', 'refresh_token', 'expiresIn'];
}
