<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Forum\ThreadController;
use App\Models\Forum\ForumComments;
use App\Models\Forum\ForumThreads;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Forum\ForumCategories;
use App\Models\Forum\ForumSubcategories;

class ForumController extends Controller
{
    

    public function index(Request $request){
        $forum__categories = ForumCategories::orderBy('position', 'ASC')->get();
        foreach($forum__categories as $category){
            $category->subcategories = ForumSubcategories::where('parent_id', $category->id)->orderBy('position', 'ASC')->get();
            foreach($category->subcategories as $sc){
                $sc->roles = $sc->roles();
                if(count($sc->roles) == 0) 
                    $sc->isAllowedCreated = true;
                else {
                    $sc->isAllowedCreated = false;
                    foreach($sc->roles as $scr){
                        if($scr->isAllowed){
                            $sc->isAllowedCreated = true;
                            break;
                        }
                    }
                }
            }
        }
        $threads = [];
        $isAllowedCreateThread = true;
        if(isset($forum__categories[0])){
            if(isset($forum__categories[0]->subcategories[0]))
                $isAllowedCreateThread = $forum__categories[0]->subcategories[0]->isAllowedCreated;
            $threads = $this->sqlPaginate_threads($forum__categories[0]->id, 1);
        }
        return Inertia::render('Forum/Index', [
            'categories' => $forum__categories,
            'threads' => $threads,
            'isAllowedCreateThread' => $isAllowedCreateThread,
        ]);
    }

    public function threads_paginate(Request $request){
        return response()->json($this->sqlPaginate_threads($request->parent_id, $request->page));
    }

    public function sqlPaginate_threads($parent_id, $page){
        $threadsData = ForumThreads::where('sc_id', '=', $parent_id)->orderBy('pinned', 'DESC')->orderBy('updated_at', 'DESC')->paginate(
            10, ['*'], 'threads', $page
        );

        foreach($threadsData as $thread){
            $thread->author = User::where('id', $thread->user_id)->first();
            $thread->comments = ForumComments::where('th_id', $thread->id)->count();
        }

        return $threadsData;
    }

    public function thread_view($th_id){
        $thread = ForumThreads::where('id', $th_id)->first();
        if($thread == null) abort(404);
        $thread->author = User::where('id', $thread->user_id)->first();
        $threadsAuthor = ForumThreads::where('user_id', $thread->user_id)->count();
        $commentsAuthor = ForumComments::where('user_id', $thread->user_id)->count();
        $thread->author->messages = $threadsAuthor + $commentsAuthor;
        $thread->author->role = $thread->author->getHigherRole();
        $thread->comments = (new ThreadController)->sqlPaginate_Comment($thread->id, 0);
        return Inertia::render('Forum/Thread/View', [
            'thread' => $thread
        ]);
    }

}
