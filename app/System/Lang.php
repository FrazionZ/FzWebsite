<?php

namespace App\System;

class Lang {

    private $frazionz;
    private $logger;

    public function __construct(){
        $fzLangPath = resource_path('lang/frazionz/'.app()->getLocale() .'.json');
        if(!file_exists($fzLangPath))
            $this->frazionz = [];
        else
            $this->frazionz = json_decode(file_get_contents($fzLangPath), true);
        
        if(isset($this->frazionz['logger']))
            $this->logger = $this->frazionz['logger'];
        else
            $this->logger = [];
    }

    public function getLogger($key, $replaceArr){
        $parts = explode('.', $key);
        $currentObject = $this->logger;

        foreach ($parts as $part) {
            $currentObject = $currentObject[$part];
        }

        if($replaceArr !== null)
            if($currentObject !== null){
                foreach($replaceArr as $ra){
                    $currentObject = str_replace($ra['key'], $ra['value'], $currentObject);
                }
            }

        return $currentObject;
    }


}