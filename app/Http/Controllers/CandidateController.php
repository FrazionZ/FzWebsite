<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Candidate;
use App\Models\CandidateComments;
use Illuminate\Support\Facades\Auth;
use GrahamCampbell\Markdown\Facades\Markdown;
use Illuminate\Support\Facades\Validator;

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
            "feature" => $feature,
            "categories" => $categories,
            "candidAlreadyPost" => $candidAlreadyPost, 
            "candidCooldown" => $candidCooldown
        ]);
    }

    public function create(){
        $feature = $this->featuresEnable('candidate');
        if(!$feature)
            return redirect()->route('candidate.index');
        if(Candidate::where('uid', '=', Auth::user()->id)->where('state', '<', 2)->count())
            abort(404);
        $candidateCheck = Candidate::where('uid', '=', Auth::user()->id)->where('state', '>', 1)->orderBy('created_at', 'desc')->first();
        if($candidateCheck !== null){
            $now   = time();
            $date2 = strtotime($candidateCheck->created_at);
            $diffDayCooldown = (int) $this->dateDiff($now, $date2)['day'];
            if($diffDayCooldown !== null)
                if($diffDayCooldown < 30)
                    abort(404);
        }
        return Inertia::render('Candidate/Create', [
            'feature' => $feature
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

    public function handleCreate(Request $request){

        $inputs = $request->all();

        $validator = Validator::make($inputs, [
            'age' => 'required|int',
            'discordTag' => 'required|string',
            'present' => 'required|string',
            'public' => 'required|int',
            'rank' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Vous devez remplir touts les champs"));
        }
        
        $candidateCheck = Candidate::where('uid', '=', Auth::user()->id)->where('state', '>', 1)->orderBy('created_at', 'desc')->first();
        if($candidateCheck !== null){
            $now   = time();
            $date2 = strtotime($candidateCheck->created_at);
            $diffDayCooldown = (int) $this->dateDiff($now, $date2)['day'];
            if($diffDayCooldown !== null)
                if($diffDayCooldown < 30)
                    return redirect()->back()->with("status", $this->toastResponse('error', "Vous avez était refusée suite à votre dernière candidature, vous devez attendre 30 jours pour reposter une candidature."));
        }

        if(Candidate::where('uid', '=', Auth::user()->id)->where('state', '<', 2)->count())
            return redirect()->back()->with("status", $this->toastResponse('error', "Vous avez déjà envoyé une candidature !"));

        $rankAllowed = ["helper"];

        $age = $inputs['age'];
        $rank = $inputs['rank'];
        $tgdiscord = $inputs['discordTag'];
        $presente = $inputs['present'];
        $public = $inputs['public'];
        if($age <= 14 || $age >= 101)
            return redirect()->back()->with("status", $this->toastResponse('error', "Votre âge doit être de 15 ans minimum et de 100 maximum !"));

        $validRank = false;
        foreach($rankAllowed as $rk)
            if($rank == $rk)
                $validRank = true;
        
        if(!$validRank)
            return redirect()->back()->with("status", $this->toastResponse('error', "Le rang souhaité n'est pas valide !"));

        if(!preg_match("/^((.+?)#\d{4})/", $tgdiscord))
            return redirect()->back()->with("status", $this->toastResponse('error', "Le nom d'utilisateur Discord n'est pas valide !"));

        if(strlen($presente) <= 250)
            return redirect()->back()->with("status", $this->toastResponse('error', "Votre présentation doit faire minimum 150 caractères !"));

        $presente = Markdown::convert($presente)->getContent();

        $candidate = Candidate::create([
            "uid" => Auth::user()->id,
            "age" => $age,
            "rank" => $rank,
            "discordtag" => $tgdiscord,
            "present" => base64_encode($presente),
            "public" => $public
        ]);

        return redirect()->away('/candidate/show/'.$candidate->id)->with("status", $this->toastResponse('success', "Votre candidature a bien été envoyée "));
    }

    public function handleComment(Request $request){

        $validator = Validator::make($request->all(), [
            'cid' => 'required|int',
            'comment' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Votre commentaire est vide."));
        }

        $candidate = Candidate::where('id', '=', $request->input('cid'))->first();
        if($candidate == null)
            return redirect()->back()->with("status", $this->toastResponse('error', "Votre commentaire n'a pas été envoyé :'("));
        if($candidate->public == 0)
            if(!Auth::user()->isAdmin())
                if(Auth::user()->id !== $candidate->uid)
                    return redirect()->back()->with("status", $this->toastResponse('error', "Votre commentaire n'a pas été envoyé :'("));

        CandidateComments::insert([
            "uid" => Auth::user()->id,
            "cid" => $request->input('cid'),
            "comment" => base64_encode($request->input('comment'))
        ]);

        return redirect()->back()->with('status', $this->toastResponse('success', 'Votre commentaire a bien été envoyé !'));

    }


    public function handleSettings(Request $request){
        $validator = Validator::make($request->all(), [
            'cid' => 'required|int',
            'state' => 'required|string',
            'locked' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Vous devez correctement remplir le formulaire !"));
        }

        $dstate = explode('_', $request->input('state'));
        $state = $dstate[0];
        $substate = $dstate[1];
        $cid = $request->input('cid');
        $locked = $request->input('locked');

        Candidate::where('id', $cid)->update([
            'state' => $state,
            'substate' => $substate,
            'locked' => $locked
        ]);

        return redirect()->back()->with("status", $this->toastResponse('success', "La candidature a bien été mis à jour"));
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
