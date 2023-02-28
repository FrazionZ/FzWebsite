<?php

namespace App\Models\Traits\Loggable;

class ILoggable {
    
    public function __construct() {
    }

    public function execute($dataReplaceArr, $data) {
        $d = $this->exec($dataReplaceArr, $data);
        $d = array_merge($dataReplaceArr, $d);
        return $d;
    }

    public function exec($dataReplaceArr, $data) {
        return $dataReplaceArr;
    }
}