<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuildProfile extends Model
{
    use HasFactory;

    protected $connection = 'faction';
    protected $table = "guild__profile";

    public function getRank(){
        switch($this->faction_rank) {
            case 1:
                return "Leader";
            case 2:
                return "Officer";
            case 3:
                return "Member";
            case 4:
                return "Recrue";
        }
    }
}
