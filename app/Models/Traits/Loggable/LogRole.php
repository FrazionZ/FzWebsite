<?php

namespace App\Models\Traits\Loggable;

use App\Models\Role;

class LogRole extends ILoggable {
    

    public function exec($dataReplaceArr, $data): Array {
        $role = Role::select('name')->where('id', $data['role']['id'])->first();
        return [
            array(
                'key' => '%role_name%', 
                'value' => $role->name
            )
        ];
    }

}