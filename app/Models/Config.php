<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    use HasFactory;

    protected $table = "config";

    public $timestamps = false;

    protected $primaryKey = "key";

    protected $fillable = ['value'];
    
    public static function get($key, $default) {
        $val = self::where('key', '=', $key)->first();
        if($val !== null)
            return $val->value;
        else
            return $default;
    }

    public static function set($key, $nv) {
        $val = self::where('key', '=', $key)->first();
        if($val !== null)
            return $val->update(['value' => $nv]);
    }
}
