<?php

namespace App\Models\Traits\Loggable;

use App\Models\Role;

class LogPermission extends ILoggable {
    

    public function exec($dataReplaceArr, $data): Array {
        return [
            array(
                'key' => '%key_perm%', 
                'value' => $data['key']
            )
        ];
    }

}