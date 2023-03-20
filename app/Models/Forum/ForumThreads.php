<?php

namespace App\Models\Forum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumThreads extends Model
{
    use HasFactory;
    protected $table = "forum__threads";
    protected $fillable = ['title', 'content', 'sc_id', 'user_id', 'locked', 'public', 'pinned', 'updated_at', 'updated_type'];
}
