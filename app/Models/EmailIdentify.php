<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailIdentify extends Model
{
    use HasFactory;

    protected $table = "email_identify";
    protected $primaryKey = 'user_id';


}
