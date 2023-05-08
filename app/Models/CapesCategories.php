<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CapesCategories extends Model
{
    use HasFactory;
    
    protected $connection = "api";
    protected $table = "capes_category";
}
