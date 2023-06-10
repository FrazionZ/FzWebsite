<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopTypes extends Model
{

    use HasFactory;

    protected $connection = 'faction';
    protected $table = 'economy__shop_type';

    public function pagination($perPage = 10, $url, $page, $onlyUser, $user_id = null){
        $types = $this->paginate($perPage, ['*'], $url, $page);
        return $types;
    }
}
