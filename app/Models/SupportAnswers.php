<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportAnswers extends Model
{
    use HasFactory;

    protected $table = "support__answers";

    
    protected $fillable = ['author', 'ticket_id', 'content', 'ip_address'];

    public static function getWithAuthor($tid) {
        $messages = SupportAnswers::where('ticket_id', $tid)->get();
        foreach($messages as $msg) {
            $msg->author = User::select('id', 'name')->where('id', $msg->author)->first();
        }
        return $messages;
    }
}
