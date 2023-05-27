<?php

namespace App\Models;

use App\System\Lang;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Loggable\ILoggable;

class Notifications extends Model
{
    use HasFactory;

    public function determineEnum(Notifications $log){

        $lang = new Lang('notifications');

        //DETERMINE THE CATEGORIE WITH EXPLODE ENUM
        $logEnum = explode('.', $log->type);
        $category = $logEnum[0]; //SYSTEM, USER
        $subCategory = $logEnum[1]; //MAINTENANCE, ROLE, CANDIDATURE, LOGGED, SHOP, ADMIN, ETC

        $dataReplaceArr = [];
        if(isset($log->data['username']))
            array_push($dataReplaceArr, array('key' => '%username%', 'value' => $log->data['username'])); //CHANGE KEY USER_NAME FOR SHOW USER ORIGIN NAME
        if(isset($data['targetid'])) {
            $tu = User::select('id', 'name')->where('id', $log->data['targetid'])->first();
            array_push($dataReplaceArr, array('key' => '%targetname%', 'value' => $tu->name)); //CHANGE KEY TARGET_NAME FOR SHOW USER TARGET ORIGIN NAME
            $log->target = $tu;
        }

        $logClass = (isset($this->loggable[$subCategory])) ? $this->loggable[$subCategory] : ILoggable::class; //DETERMINE CLASS LOGGABLE FOR READ ENUM
        $ref = new \ReflectionClass($logClass); //INIT CLASS ILOGGABLE
        $ilog = $ref->newInstance(); //FINAL INIT CLASS ILOGGABLE
        $dataReplaceArr = $ilog->execute($dataReplaceArr, $log->data); //CALLING FUNCTION EXEC FOR SEND FINAL ENUM IN LOG

        return $lang->getLang($log->type, $dataReplaceArr);
    }
}
