<?php

namespace App\Models\Forum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumCategories extends Model
{
    use HasFactory;

    protected $table = "forum__categories";
    protected $fillable = ['name', 'position'];
}
