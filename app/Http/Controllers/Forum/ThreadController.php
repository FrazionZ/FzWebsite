<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Models\Forum\ForumCategories;
use App\Models\Forum\ForumComments;
use App\Models\Forum\ForumSubcategories;
use App\Models\Forum\ForumThreads;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ThreadController extends Controller
{
    
    public function comment_paginate(Request $request){
        return response()->json($this->sqlPaginate_Comment($request->parent_id, $request->page));
    }

    public function sqlPaginate_Comment($th_id, $page){
        $comments = ForumComments::where('th_id', $th_id)->orderBy('created_at', 'ASC')->paginate(
            10, ['*'], 'comments', $page
        );
        foreach($comments as $comment){
            $comment->author = User::where('id', $comment->user_id)->first();
            $threadsAuthor = ForumThreads::where('user_id', $comment->author->id)->count();
            $commentsAuthor = ForumComments::where('user_id', $comment->author->id)->count();
            $comment->author->messages = $threadsAuthor + $commentsAuthor;
            $comment->author->role = $comment->author->getHigherRole();
        }

        return $comments;
    }

    public function comment_publish(Request $request){
        $validator = Validator::make($request->all(), [
            'th_id' => 'required|int',
            'comment' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Votre commentaire est vide ou la requête est incomplète."));
        }

        $thread = ForumThreads::where('id', '=', $request->th_id)->first();
        if($thread == null)
            return redirect()->back()->with("status", $this->toastResponse('error', "Votre commentaire n'a pas été envoyé :'("));

        if($thread->locked)
            return redirect()->back()->with("status", $this->toastResponse('error', "Ce thread est vérouillé, impossible d'envoyer un commentaire"));

        $thread->update(["updated_type" => 1, "updated_at" => now()]);

        ForumComments::insert([
            "user_id" => $request->user()->id,
            "th_id" => $request->th_id,
            "content" => base64_encode($request->comment)
        ]);

        return redirect()->back()->with("status", $this->toastResponse('success', "Votre commentaire a bien été envoyé !"));
    }


    public function actions_pinned(Request $request){
        $validator = Validator::make($request->all(), [
            'th_id' => 'required|int'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "La requête de cette action est incomplète."));
        }

        if(!Auth::user()->hasPermission('forum.thread.pinned'))
            return redirect()->back()->with("status", $this->toastResponse('error', "Vous n'avez pas la permission d'exécuter cette requête"));

        $thread = ForumThreads::where('id', '=', $request->th_id)->first();
        if($thread == null)
            return redirect()->back()->with("status", $this->toastResponse('error', "L'action a échoué"));

        $thread->update(["pinned" => ($thread->pinned) ? false : true, "updated_type" => 0, "updated_at" => now()]);

        return redirect()->back()->with("status", $this->toastResponse('success', "Mise à jour du thread réussie."));

    }

    public function actions_locked(Request $request){
        $validator = Validator::make($request->all(), [
            'th_id' => 'required|int'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "La requête de cette action est incomplète."));
        }

        if(!Auth::user()->hasPermission('forum.thread.locked'))
            return redirect()->back()->with("status", $this->toastResponse('error', "Vous n'avez pas la permission d'exécuter cette requête"));

        $thread = ForumThreads::where('id', '=', $request->th_id)->first();
        if($thread == null)
            return redirect()->back()->with("status", $this->toastResponse('error', "L'action a échoué"));

        $thread->update(["locked" => ($thread->locked) ? false : true, "updated_type" => 0, "updated_at" => now()]);

        return redirect()->back()->with("status", $this->toastResponse('success', "Mise à jour du thread réussie."));

    }

    public function create_form($sc_id){
        $sc = ForumSubcategories::where('id', $sc_id)->first();
        if($sc == null) return redirect()->route('forum.index');
        if(!$sc->isAllowedParent()) return redirect()->route('forum.index')->with("status", $this->toastResponse('error', "Vous n'avez pas la permission de créer un thread dans cette catégorie"));
        $fc = ForumCategories::where('id', $sc->parent_id)->first();
        if($fc == null) return redirect()->route('forum.index');
        return Inertia::render('Forum/Thread/FormCreate', [
            "sc" => $sc,
            "fc" => $fc
        ]);
    }

    public function create_handle(Request $request){
        $validator = Validator::make($request->all(), [
            'sc_id' => 'required|int',
            'title' => 'required|string',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est incomplet."));
        }

        $sc = ForumSubcategories::where('id', $request->sc_id)->first();
        if($sc == null) return redirect()->back()->with("status", $this->toastResponse('error', "Erreur lors de la lecture des données"));
        if(!$sc->isAllowedParent()) return redirect()->route('forum.index')->with("status", $this->toastResponse('error', "Vous n'avez pas la permission de créer un thread dans cette catégorie"));
        
        $newThread = ForumThreads::create([
            'title' => $request->title,
            'sc_id' => $sc->id,
            'user_id' => $request->user()->id,
            'content' => base64_encode($request->content)
        ]);

        return redirect()->route('forum.thread.view', ['th_id' => $newThread->id])->with("status", $this->toastResponse('success', "Votre Thread est maintenant créé"));

    }

}
