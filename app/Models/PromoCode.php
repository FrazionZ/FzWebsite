<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    use HasFactory;

    protected $table = "promocode";

    protected $fillable = ['code', 'expire_date', 'max_use', 'max_use_per_user', 'give_amount', 'type'];

    public function isExpired(){
        $historyPromoCode = PromoCodeHistory::where('pc_id', $this->id)->get();
        if(count($historyPromoCode) >= $this->max_use) return true;
        $dateNow = date('Y-m-d');
        if(str_starts_with($this->expire_date, $dateNow)) return true;
        return false;
    }
}
