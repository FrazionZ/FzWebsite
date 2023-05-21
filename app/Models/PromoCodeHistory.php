<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCodeHistory extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'pc_id'];

    protected $table = "promocode_history";

    public $timestamps = false;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->timestamps = false;
            $model->created_at = now();
        });
    }

    public function pagination($perPage = 10, $url, $page, $onlyUser, $pc_id = null){
        $pch_log = $this->orderBy('created_at', 'desc')
                        ->where('pc_id', '=', $pc_id)
                        ->paginate($perPage, ['*'], $url, $page);

        foreach($pch_log as $log){
            $log->user = User::select('id', 'name')->where('id', $log->user_id)->first();
        }

        return $pch_log;
    }
}
