<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopItems extends Model
{
    use HasFactory;

    protected $connection = 'faction';
    protected $table = 'economy__shop_item';

    public function pagination($perPage = 10, $url, $page, $like){
        $items = $this->where('name', 'LIKE', '%'.$like.'%')->paginate($perPage, ['*'], $url, $page);
        foreach($items as $item){
            $item->type = ShopTypes::where('id', $item->shop_type_id)->first();
        }
        return $items;
    }
}
