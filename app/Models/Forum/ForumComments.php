<?php

namespace App\Models\Forum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumComments extends Model
{
    use HasFactory;

    protected $table = "forum__comments";
}
