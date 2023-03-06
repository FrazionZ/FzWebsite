<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class GithubController extends Controller
{
    

    function index(Request $request){
        if($request->session()->has('github')){
            $guser = guser($request);
            $reposGithub = grequest("/orgs/".config('frazionz.github.owner')."/repos", $guser);
            usort($reposGithub, fn($a, $b) => $a->visibility <=> $b->visibility);
            $reposGithub = array_reverse($reposGithub);
            $reposGithubData = [
                "data" => []
            ];
            foreach($reposGithub as $key => $rel){
                $key++;
                if($rel->owner->login == config('frazionz.github.owner')){
                    $checkedRepo = false;
                    foreach(config('frazionz.github.reposAllow') as $repo) if($repo['name'] == $rel->name) $checkedRepo = true;
                    if($checkedRepo) 
                        array_push($reposGithubData['data'], ["name" => $rel->name, "visibility" => $rel->visibility, "created_at" => date('d/m/Y à H:i:s', strtotime($rel->created_at))]);
                } 
            }
            $reposGithubData['data'] = array_reverse($reposGithubData['data']);
            return Inertia::render('Admin/Github/ConnectedIndex', ['guser' => $request->get('guser'), 'repos' => $reposGithubData]);
        }else{
            $error = null;
            if($request->session()->has('error')) {
                $error = $request->session()->get('error')[0];
                $request->session()->forget('error');
            }
        }
        return Inertia::render('Admin/Github/Index', ['error' => $error]);
    }
    
    function start(Request $request){
        $url = Socialite::driver('github')
            ->scopes(['read:user', 'repo:status', 'user', 'user:email', 'repo', 'project', 'read:project', 'public_repo', 'admin:org', 'write:org', 'read:org'])
            ->redirect()->getTargetUrl();
        
        return Inertia::location($url);
        //return Inertia::location();
    }

    function callback(Request $request) {
        $user = Socialite::driver('github')->user();

        $response = grequest('/orgs/FrazionZ/members', $user);
        
        //CHECK IF USER PRESENT IN ORGANIZATION FRAZIONZ
        $checked = false;
        foreach($response as $ruser){
            if($user->id == $ruser->id){
                $checked = true;
                break;
            }
        }

        if(!$checked) {
            $request->session()->push('error', 'Ce profil Github ne semble pas être présent dans l\'organisation FrazionZ!');
            return redirect(route('admin.github.index'));
        } 
        
        $request->session()->put('github', $user);
        
        return redirect(route('admin.github.index'));
    }
    
    function logout(Request $request) {
        $request->session()->forget('github');
        return redirect('auth');
    }


}
