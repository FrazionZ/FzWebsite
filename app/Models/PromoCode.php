<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    use HasFactory;

    protected $table = "promocode";

    protected $fillable = ['code', 'expire_date', 'max_use', 'max_use_per_user', 'give_amount', 'type'];
}
