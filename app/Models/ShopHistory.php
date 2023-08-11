<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ShopHistory extends Model
{
    use HasFactory;

    protected $connection = 'faction';
    protected $table = 'shop__history';

    public static function pagination($perPage = 10, $url, $page){
        $storeArticles = ShopHistory::orderBy('created_at', 'desc')->where('uuid', Auth::user()->uuid)->paginate($perPage, ['*'], $url, $page);
        foreach($storeArticles as $sa){
            $sa->item = ShopItems::select('id', 'name')->where('id', $sa->item_id)->first();
        }
        return $storeArticles;
    }
}
