<?php

namespace App\System;

class Lang {

    private $frazionz;
    private $parent;

    public function __construct($parent){
        $fzLangPath = resource_path('lang/frazionz/'.app()->getLocale() .'.json');
        if(!file_exists($fzLangPath))
            $this->frazionz = [];
        else
            $this->frazionz = json_decode(file_get_contents($fzLangPath), true);
        
        if(isset($this->frazionz[$parent]))
            $this->parent = $this->frazionz[$parent];
        else
            $this->parent = [];
    }

    public function getLang($key, $replaceArr){
        $parts = explode('.', $key);
        unset($parts[0]);
        $parts = array_values($parts);
        $currentObject = $this->parent;

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