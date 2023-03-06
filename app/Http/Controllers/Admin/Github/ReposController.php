<?php

namespace App\Http\Controllers\Admin\Github;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ReposController extends Controller {

    
    function index(Request $request, $id){
        $guser = guser($request);
        $repos = grequest('/repos/'.config("frazionz.github.owner").'/'.$id, $guser);
        $releases = $this->releasesPerPage($request, $id);

        return Inertia::render('Admin/Github/Repos/Index', ['releases' => $releases, 'repos' => $repos]);
    }

    function releasesPerPage(Request $request, $id){
        $guser = guser($request);
        $page = 1;
        if($request->query('page') !== null)
            $page = $request->query('page');

        $releases = grequest('/repos/'.config("frazionz.github.owner").'/'.$id.'/releases?per_page=10&page='.$page, $guser);
        $releasesData = [
            "data" => []
        ];

        foreach($releases as $key => $rel){
            if(!$rel->draft){
                $key++;
                array_push($releasesData['data'], ["key" => $key, "id" => $rel->id, "url" => $rel->html_url, "name" => $rel->name, "author" => $rel->author->login, "created_at" => $rel->created_at]);
            }
        }

        return ["page" => $page, "data" => $releasesData];
    }

    public function create(Request $request, $id){
        $guser = guser($request);
        $repos = grequest('/repos/'.config("frazionz.github.owner").'/'.$id, $guser);
        $reposBranch = grequest('/repos/'.config("frazionz.github.owner").'/'.$id.'/branches', $guser);
        $branches = [];
        foreach($reposBranch as $rb) if($rb->name !== "main" && $rb->name !== "master") array_push($branches, $rb);
        $repos->branches = $branches;
        $subasset = $this->getInfosReposApp($repos->name)['subasset'];
        return Inertia::render('Admin/Github/Repos/Create', ['repos' => $repos, 'subasset' => $subasset, 'guser' => $guser]);
    }

    public function draft_create(Request $request){
        $guser = guser($request);
        $inputs = $request->all();
        $apiURL = 'https://api.github.com/repos/'.config("frazionz.github.owner").'/'.$inputs['id'].'/releases';

        $checkedInputs = false;
        foreach($inputs as $input){
            if($input == null){
                $checkedInputs = true;
                break;
            }
        }

        if($checkedInputs) return json_encode(['status' => 'err', 'data' => 'Vous devez remplir le formulaire.']);

        $postInput = [
            'draft' => true,
            'tag_name' => $inputs['tag'],
            'target_commitish' => $inputs['branch'],
            'name' => $inputs['title']
        ];

        $client = new \GuzzleHttp\Client();
        $response = $client->request('POST', $apiURL, [
            'headers' => [
                'Authorization' => 'Bearer ' . $guser->token,        
                'Accept'        => 'application/vnd.github+json',
                'User-Agent'    => 'Awesome-Octocat-App'
            ],
            'body' => json_encode($postInput)
        ]);

        $responseBody = json_decode($response->getBody(), true);

        return json_encode(['status' => 'success', 'data' => $responseBody]);
    }

    public function draft_check_tag_exist(Request $request, $id, $tag){
        $guser = guser($request);
        
        $apiURL = 'https://api.github.com/repos/'.config("frazionz.github.owner").'/'.$id.'/releases/tags/'.$tag;
        
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', $apiURL, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $guser->token,        
                    'Accept'        => 'application/vnd.github+json',
                    'User-Agent'    => 'Awesome-Octocat-App'
                ]
            ]);
            return response()->json(json_decode($response->getBody(), true));
        }catch (\GuzzleHttp\Exception\ClientException $e) {
            $response = $e->getResponse();
            $statusCode = $e->getCode();
            $responseBodyAsString = $response->getBody()->getContents();
            $response = json_decode($responseBodyAsString, true);
            $response['code'] = $statusCode;
            return response()->json($response);
        }
        
    }

    public function draft_asset_store(Request $request){
        $file = $request->file;
        $fileName = $file->getClientOriginalName();
        $file->move(storage_path('app/public/repos/'.$request->input('repo_release_id').'/'), $fileName);
        return response()->json(["status" => "success"]);
    }
    public function draft_asset_upload(Request $request){
        $guser = guser($request);

        foreach($request->file('files') as $file){

            $fileName = $file->getClientOriginalName();
            
            $filePathAsset = Storage::disk('public')->path('repos/'.$request->input('repo_release_id').'/'.$fileName);

            $fileBinaryAsset = File::get($filePathAsset);

            $apiURL = 'https://uploads.github.com/repos/'
                            .config("frazionz.github.owner").
                            '/'
                            .$request->input('repo_name')
                            .'/releases/'
                            .$request->input('repo_release_id').'/assets?name='
                            .$file->getClientOriginalName();
            $client = new \GuzzleHttp\Client();
            $response = $client->request('POST', $apiURL, [
                'headers' => [
                    'User-Agent' => 'Awesome-Octocat-App',
                    'Authorization' => 'Bearer ' . $guser->token,  
                    'Content-Type' => 'application/octet-stream',
                ],
                'body' => $fileBinaryAsset,
            ]);
        }

        return redirect()->back()->with("status", $this->toastResponse('success', "Upload terminée."));

    }
    public function draft_update(Request $request){
        $guser = guser($request);
        $inputs = $request->all();

        $checkedInputs = false;
        foreach($inputs as $input){
            if($input == null){
                $checkedInputs = true;
                break;
            }
        }

        if($checkedInputs) return json_encode(['status' => 'err', 'data' => 'Vous devez remplir le formulaire.']);

        
        $apiURL = 'https://api.github.com/repos/'.config("frazionz.github.owner").'/'.$inputs['repo_name'].'/releases/'.$inputs['release_id'];

        $postInput = [
            'draft' => false
        ];

        $client = new \GuzzleHttp\Client();
        $response = $client->request('POST', $apiURL, [
            'headers' => [
                'Authorization' => 'Bearer ' . $guser->token,        
                'Accept'        => 'application/vnd.github+json',
                'User-Agent'    => 'Awesome-Octocat-App'
            ],
            'body' => json_encode($postInput)
        ]);

        $responseBody = json_decode($response->getBody(), true);

        return json_encode(['status' => 'success', 'data' => $responseBody]);
    }

    function getInfosReposApp($name){
        foreach(config('frazionz.github.reposAllow') as $repo)
            if($repo['name'] == $name)
                return $repo;
    }

}