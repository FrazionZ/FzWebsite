<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FactionProfile extends Model
{
    use HasFactory;

    protected $connection = 'faction';
    protected $table = 'profile';

    protected $primaryKey = "uuid";
    protected $fillable = ['money'];

    public $timestamps = false;
}
