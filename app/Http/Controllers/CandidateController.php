<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Candidate;
use App\Models\CandidateComments;

class CandidateController extends Controller
{

    private $categories = null;

    public function __construct(){
        $this->categories = array(
            array(
                "display" => "En Attente",
                "info" => "Les candidatures dans cette section peuvent encore êtres modifiées à tout moment.",
                "show" => "Candidature en attente de traitement",
                "candids" => array()
            ),
            array(
                "display" => "En Cours de Traitement",
                "info" => "Les candidatures dans cette section sont en cours d’analyse par des membres de l’équipe.",
                "show" => "Candidature en cours de traitement",
                "candids" => array()
            ),
            array(
                "display" => "Traitées",
                "info" => "Dans cette section, les candidatures ont été traitées.",
                "show" => "Cette candidature a été traitée",
                "candids" => array()
            )
        );
    }
    
    public function index(Request $request){
        $feature = $this->featuresEnable('candidate');

        $categories = $this->categories;
        foreach($categories as $k => $category){
            $categories[$k]['id'] = $k;
            $categories[$k]['candids'] = $this->requestPaginate($request, $k, 0);
        }

        $candidAlreadyPost = false;
        $candidCooldown = false;
        if(Candidate::where('uid', '=', $request->user()->id)->where('state', '<', 2)->count())
            $candidAlreadyPost = true;
            $candidateCheck = Candidate::where('uid', '=', $request->user()->id)->where('state', '>', 1)->orderBy('created_at', 'desc')->first();
            if($candidateCheck !== null){
                $now   = time();
                $date2 = strtotime($candidateCheck->created_at);
                $diffDayCooldown = (int) $this->dateDiff($now, $date2)['day'];
                if($diffDayCooldown !== null)
                    if($diffDayCooldown < 30)
                        $candidCooldown = true;
        }

        return Inertia::render('Candidate/Index', [
            'feature' => $feature,
            "categories" => $categories,
            "candidAlreadyPost" => $candidAlreadyPost, 
            "candidCooldown" => $candidCooldown
        ]);
    }

    public function requestPaginate(Request $request, $category, $page = 0){
        $candidatesData = Candidate::where('state', '=', $category)->orderBy('created_at', 'DESC')->paginate(
            10, ['*'], 'candidature', $page
        );
        foreach($candidatesData as $k => $candid){
            if($candid->public == 0)
                if(!$request->user()->isAdmin())
                    if($request->user()->id !== $candid->uid)
                        unset($candidatesData[$k]);

            $user = User::where('id', $candid->uid)->first();
            $candid->countComment = CandidateComments::where('cid', '=', $candid->id)->count();
            $candid->uid = $user->id;
            $candid->upseudo = $user->name;
            //$candid->state = $this->decryptState($candid->state);

            $candid->created_at = \DateTime::createFromFormat("@", $candid->created_at);
        }

        return $candidatesData;
    }

    public function show($id){
        $candidate = Candidate::where('id', '=', $id)->first();
        if($candidate == null) abort(404);
        $user = User::where('id', $candidate->uid)->first();
        $candidate->upseudo = $user->name;
        $candidate->present = base64_decode($candidate->present);
        $category = $this->categories[$candidate->state];
        $comments = CandidateComments::where('cid', '=', $candidate->id)->get();
        foreach($comments as $comment){
            $user = User::select('id', 'name')->where('id', $comment->uid)->first();
            $comment->user = $user;
            $comment->user->role = User::getRole($user->id);
            $comment->comment = base64_decode($comment->comment);
        }
        return Inertia::render('Candidate/Show', [
            'candidate' => $candidate,
            'category' => $category,
            'comments' => $comments
        ]);
    }

    
    public function dateDiff($date1, $date2){
        $diff = abs($date1 - $date2); // abs pour avoir la valeur absolute, ainsi éviter d'avoir une différence négative
        $retour = array();
     
        $tmp = $diff;
        $retour['second'] = $tmp % 60;
     
        $tmp = floor( ($tmp - $retour['second']) /60 );
        $retour['minute'] = $tmp % 60;
     
        $tmp = floor( ($tmp - $retour['minute'])/60 );
        $retour['hour'] = $tmp % 24;
     
        $tmp = floor( ($tmp - $retour['hour'])  /24 );
        $retour['day'] = $tmp;
     
        return $retour;
    }


}
