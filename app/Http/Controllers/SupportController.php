<?php

namespace App\Http\Controllers;

use App\Models\SupportAnswers;
use App\Models\SupportCategories;
use App\Models\SupportTickets;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SupportController extends Controller
{
    

    public function index(Request $request){


        if($request->user()->hasPermission('admin.support.show')){
            $tickets = SupportTickets::orderBy('created_at', 'desc')->get();
        }else{
            $tickets = SupportTickets::orderBy('created_at', 'desc')->where('author', $request->user()->id)->get();
        }


        foreach($tickets as $ticket){
            $ticket->author = User::select('id', 'name')->where('id', $ticket->author)->first();
            //Get Last Message
            $ticket->lastMessage = SupportAnswers::where('ticket_id', $ticket->id)->where('author', $request->user()->id)->orderBy('created_at', 'desc')->first();
            if($ticket->lastMessage !== null)
                $ticket->lastMessage->author = User::select('id', 'name')->where('id', $ticket->lastMessage->author)->first();
        }
        return Inertia::render('Support/Index', [
            'tickets' => $tickets
        ]);
    }

    public function gettingMessages(Request $request){
        $validator = Validator::make($request->all(), [
            'ticket_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['result' => 'error', 'msg' => 'Une erreur est survenue lors de la lecture des données']);
        }

        $ticket_id = $request->ticket_id;
        $ticket =  SupportTickets::where('id', $ticket_id)->first();
        if($ticket == null)  return response()->json(['result' => 'error', 'msg' => 'Une erreur est survenue lors de la lecture des données']);
        if($ticket->author !== $request->user()->id && !$request->user()->hasPermission('admin.support.show')) return response()->json(['result' => 'error', 'msg' => 'Vous n\'êtes pas autorisé à voir ce ticket']);

        $messages = SupportAnswers::getWithAuthor($ticket->id);

        return response()->json(['result' => 'success', 'messages' => $messages]);
    }

    public  function view(Request $request, $id){
        $ticket = SupportTickets::where('id', $id)->first();
        if($ticket == null) abort(404);

        $ticket->author = User::select('id', 'name')->where('id', $ticket->author)->first();
        if($ticket->author->id !== $request->user()->id) abort(401);

        //Get Answers
        $ticket->answers = SupportAnswers::where('ticket_id', $ticket->id)->get();
        foreach($ticket->answers as $answer)
            $answer->author = User::select('id', 'name')->where('id', $answer->author)->first();

        return Inertia::render('Support/View', [
            'ticket' => $ticket
        ]);
    }

    public function sendAnswer(Request $request) {
        $validator = Validator::make($request->all(), [
            'tid' => 'required|integer',
            'answer' => 'required|string|min:10',
        ]);

        if($validator->fails()){
            return redirect()->back()->with('status', $this->toastResponse('error', 'Le formulaire semble incomplet'));
        }

        $ticket =  SupportTickets::where('id', $request->tid)->first();
        if($ticket == null)  $this->toastResponse('error', 'Une erreur est survenue lors de la lecture des données');
        if($ticket->author !== $request->user()->id && !$request->user()->hasPermission('admin.support.answer')) return redirect()->back()->with('status', $this->toastResponse('error', 'Vous n\'êtes pas autorisé à répondre à ce ticket'));

        SupportAnswers::create([
            'author' => $request->user()->id,
            'ticket_id' => $ticket->id,
            'content' => $request->answer,
            'ip_address' => $_SERVER['REMOTE_ADDR']
        ]);

        return redirect()->back()->with('result', SupportAnswers::getWithAuthor($ticket->id))->with('status', $this->toastResponse('success', 'Votre réponse à bien été envoyée'));


    }

    public function create(Request $request){
        $categories = SupportCategories::get();
        return Inertia::render('Support/Create', [
            'categories' => $categories
        ]);
    }

    public function create_handle(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|min:10',
            'ch_id' => 'required|int',
            'problem' => 'required|string|min:100'
        ]);

        if($validator->fails()){
            return redirect()->back()->with('status', $this->toastResponse('error', 'Le formulaire semble incomplet'));
        }



        $ticket = SupportTickets::create([
            'title' => $request->title,
            'ch_id' => $request->ch_id,
            'problems' => $request->problem,
            'author' => $request->user()->id
        ]);

        return redirect()->route('support.view', ['id' => $ticket->id])->with('status', $this->toastResponse('success', 'Votre ticket a bien été créé'));
    }


}
