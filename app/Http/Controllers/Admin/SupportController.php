<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportAnswers;
use App\Models\SupportCategories;
use App\Models\SupportTickets;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller
{
    
    public function index(Request $request) {
        $supportTickets = new SupportTickets();
        $supportTickets = $supportTickets->pagination(10, 'page', $request->query('page', 0), false);
        return Inertia::render('Admin/Support/Index', [
            'tickets' => $supportTickets
        ]);
    }

    public function show(Request $request, $id) {
        $ticket = SupportTickets::where('id', $id)->first();
        $ticket->category = SupportCategories::where('id', $ticket->ch_id)->first();
        $ticket->author = User::select('id', 'name')->where('id', $ticket->author)->first();
        $ticket->answers = SupportAnswers::where('ticket_id', $ticket->id)->get();
        foreach($ticket->answers as $answer){
            $answer->author = User::select('id', 'name')->where('id', $answer->author)->first();
        }
        return Inertia::render('Admin/Support/Show', [
            'ticket' => $ticket
        ]);
    }


}
