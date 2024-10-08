<?php

namespace App\Models;

use App\Models\Traits\Loggable\ILoggable;
use App\Models\Traits\Loggable\LogRole;
use App\Models\Traits\Loggable\LogPermission;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\System\Lang;
use App\Models\User;

class Logger extends Model
{
    use HasFactory;

    protected $table = "logger";

    protected $fillable  = ['user_id', 'enum', 'data', 'target_id', 'ip'];

    private $loggable = ["role" => LogRole::class, "permission" => LogPermission::class];

    public static function log(string $action, $data, User $target = null, User $user_origin = null)
    {
        return self::create([
            'user_id' => ($user_origin !== null) ? $user_origin->id : Auth::id(),
            'enum' => $action,
            'data' => $data,
            'target_id' => $target?->id,
            'ip' => (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'],
        ]);
    }

    

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pagination($perPage = 10, $url, $page, $onlyUser, $user_id = null){
        $logger = $this->orderBy('created_at', 'desc')
                        ->where('enum', 'like', ($onlyUser) ? 'user.%' : '%%')
                        ->Where('user_id', ($onlyUser && $user_id !== null) ? $user_id : null)
                        ->orWhere('target_id', ($onlyUser && $user_id !== null) ? $user_id : null)
                        ->paginate($perPage, ['*'], $url, $page);
        foreach($logger as $log){
            $log->userOrigin = $log->user;
            $log->enum = $this->determineEnum($log);
        }
        return $logger;
    }

    public function determineEnum(Logger $log){

        $lang = new Lang('logger');

        //DETERMINE THE CATEGORIE WITH EXPLODE ENUM
        $logEnum = explode('.', $log->enum);
        $category = $logEnum[0]; //SYSTEM, USER
        $subCategory = $logEnum[1]; //MAINTENANCE, ROLE, CANDIDATURE, LOGGED, SHOP, ADMIN, ETC

        $dataReplaceArr = [];
        array_push($dataReplaceArr, array('key' => '%user_name%', 'value' => $log->user->name)); //CHANGE KEY USER_NAME FOR SHOW USER ORIGIN NAME
        if($log->target_id !== null){
            $tu = User::select('id', 'name')->where('id', $log->target_id)->first();
            array_push($dataReplaceArr, array('key' => '%target_name%', 'value' => $tu->name)); //CHANGE KEY TARGET_NAME FOR SHOW USER TARGET ORIGIN NAME
            $log->target = $tu;
        }
        $data = json_decode($log->data, true); //READ DATA JSON

        $logClass = (isset($this->loggable[$subCategory])) ? $this->loggable[$subCategory] : ILoggable::class; //DETERMINE CLASS LOGGABLE FOR READ ENUM
        $ref = new \ReflectionClass($logClass); //INIT CLASS ILOGGABLE
        $ilog = $ref->newInstance(); //FINAL INIT CLASS ILOGGABLE
        $dataReplaceArr = $ilog->execute($dataReplaceArr, $data); //CALLING FUNCTION EXEC FOR SEND FINAL ENUM IN LOG

        return $lang->getLang($log->enum, $dataReplaceArr, false);
    }
}
