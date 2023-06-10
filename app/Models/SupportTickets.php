<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportTickets extends Model
{
    use HasFactory;

    protected $table = "support__tickets";

    protected $fillable = ['title', 'author', 'state', 'ch_id', 'problems', 'updated_at'];

    public function pagination($perPage = 10, $url, $page, $onlyUser, $user_id = null){
        $tickets = $this->orderBy('created_at', 'desc')->paginate($perPage, ['*'], $url, $page);
        foreach($tickets as $ticket){
            $ticket->author = User::select('id', 'name')->where('id', $ticket->author)->first();
            //Get Last Message
            $ticket->category = SupportCategories::where('id', $ticket->ch_id)->first();
            $ticket->lastMessage = SupportAnswers::where('ticket_id', $ticket->id)->orderBy('created_at', 'desc')->first();
            if($ticket->lastMessage !== null)
                $ticket->lastMessage->author = User::select('id', 'name')->where('id', $ticket->lastMessage->author)->first();
        }
        return $tickets;
    }
}
