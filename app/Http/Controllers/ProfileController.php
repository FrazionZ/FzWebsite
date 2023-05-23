<?php

namespace App\Http\Controllers;

use Adrianorosa\GeoLocation\GeoLocation;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\SkinAPI;
use App\Mail\ConfirmMail;
use App\Models\ApiSkins;
use App\Models\EmailIdentify;
use App\Models\FactionProfileSession;
use App\Models\TokenUsers;
use App\Models\User;
use App\Models\UserHName;
use App\Models\Guild;
use App\Models\GuildProfile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

    function str_without_accents($str, $charset='utf-8')
    {
        $str = htmlentities($str, ENT_NOQUOTES, $charset);

        $str = preg_replace('#&([A-za-z])(?:acute|cedil|caron|circ|grave|orn|ring|slash|th|tilde|uml);#', '\1', $str);
        $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str); // pour les ligatures e.g. '&oelig;'
        $str = preg_replace('#&[^;]+;#', '', $str); // supprime les autres caractères

        return $str;   // or add this : mb_strtoupper($str); for uppercase :)
    }

    public function index(Request $request): Response
    {
        $fastMenu = $request->query('fastMenu');
        $factionProfile = json_decode(@file_get_contents('https://api.frazionz.net/faction/profile/'.$request->user()->id), true);
        $capeData = json_decode(@file_get_contents('https://api.frazionz.net/user/'.$request->user()->uuid.'/cape/data'), true);
        $tokenUsers = TokenUsers::where('uid', $request->user()->id)->get();
        $guildProfile = GuildProfile::where('user_id', $request->user()->uuid)->first();
        $guild = null;
        if($guildProfile !== null)
            $guild = Guild::where('id', $guildProfile->faction_id)->first();
        if($guild !== null) {
            $guild->members = GuildProfile::where('faction_id', $guild->id)->orderBy('faction_rank', 'asc')->get();
            foreach($guild->members as $member) {
                $member->udata = User::select(['id', 'uuid', 'name'])->where('uuid', $member->user_id)->first();
                $member->session = FactionProfileSession::where('uuid', $member->user_id)->first();
                $member->rank = $member->getRank();
            }
        }
        foreach($tokenUsers as $token){
            $token->geo = GeoLocation::lookup(base64_decode($token->ip));
        }
        
        /*$discordController = new DiscordController();*/
        return Inertia::render('Profile/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'factionProfile' => $factionProfile,
            'fastMenu' => $fastMenu,
            'capeData' => $capeData,
            'tokensUser' => $tokenUsers,
            'guild' => $guild,
            'guildProfile' => $guildProfile,
            'pcodeEnabled' => $request->user()->isPCodeEnable(),
            'status' => session('status'),
        ]);
    }

    public function convertInventory($base64Inv, $convertSlotIndex)
    {
        $inventory = json_decode(base64_decode($base64Inv), true);
        $itemsMinecraft = json_decode(
            html_entity_decode(
                @file_get_contents("https://api.frazionz.net/public/items.json")
            ),
            true
        );
        $enchantmentsMinecraft = json_decode(
            html_entity_decode(
                @file_get_contents("https://api.frazionz.net/public/enchantments.json")
            ),
            true
        );
        $potionsMinecraft = json_decode(
            html_entity_decode(
                @file_get_contents("https://api.frazionz.net/public/potions.json")
            ),
            true
        );
        if ($inventory !== null) {
            $slot = array_column($inventory, "slot");
            foreach ($inventory as $k => $item) {
                $item["minecraftId"] = str_replace("minecraft:", "", $item["minecraftId"]);
                $item["idItemNumber"] = -1;
                $item["minecraftItemRealName"] = "Unknow";
                $item["maxDamage"] = 0;
                foreach ($itemsMinecraft as $imc) {
                    if ($imc["text_type"] == strtolower($item["minecraftId"])) {
                        $item["maxDamage"] = $imc["maxDamage"];
                        $item["valueProgressDamage"] = 0;
                        if ($item["itemData"] >= 0 && $imc["maxDamage"] > 0) {
                            $item["useDamage"] = ($item['itemData'] <= 0) ? $imc["maxDamage"] : $imc["maxDamage"] - $item['itemData'];
                            $item["itemData"] = 0;
                            $item["idItemNumber"] = $imc["type"];
                            $item["minecraftItemRealName"] = $imc["name"];
                        }
                        if ($imc["meta"] == $item["itemData"]) {
                            $item["idItemNumber"] = $imc["type"];
                            $item["minecraftItemRealName"] = $imc["name"];
                        }
                    }
                }
                $inventory[$k] = $item;
            }
            $backupBefore = $inventory;
            unset($inventory); // $foo is gone
            $inventory = [];
            foreach ($backupBefore as $k => $item) {
                if (isset($item["storedEnchants"])) {
                    foreach ($item["storedEnchants"] as $k => $enchItem) {
                        foreach ($enchantmentsMinecraft as $ech) {
                            if ($enchItem["name"] == $ech["id"]) {
                                $item["storedEnchants"][$k]["displayName"] =
                                    $ech["displayName"];
                                $item["storedEnchants"][$k]["description"] =
                                    $ech["description"];
                            }
                        }
                    }
                }
                if (isset($item["potionMeta"])) {
                    $item['potionMeta']['hasEffect'] = true;
                    if(isset($item['itemMeta']['displayName'])){
                        $item['potionMeta']['displayName'] = str_replace("\"", "", $item['itemMeta']['displayName']);
                        unset($item['itemMeta']['displayName']);
                    }
                    if(isset($item['potionMeta']['color'])){
                        $item['potionMeta']['colorCustom'] = $this->fromRGB($item['potionMeta']['color'][0], $item['potionMeta']['color'][1], $item['potionMeta']['color'][2]);
                    }else
                        $item['potionMeta']['colorCustom'] = "#385DC6";
                    foreach ($potionsMinecraft as $pot) {
                        if ($item["potionMeta"]["potionType"] == $pot["potionType"]) {
                            $item["potionMeta"]["displayName"] = $pot["displayName"];
                            $item['potionMeta']['hasEffect'] = $pot["hasEffect"];
                            if(isset($pot["color"]))
                                $item["potionMeta"]["colorCustom"] = $pot["color"];
                        }
                    }
                }
                if (isset($item["itemMeta"]["enchantments"])) {
                    foreach ($item["itemMeta"]["enchantments"] as $k => $enchItem) {
                        foreach ($enchantmentsMinecraft as $ech) {
                            if ($enchItem["name"] == $ech["id"]) {
                                $item["itemMeta"]["enchantments"][$k][
                                    "displayName"
                                ] = $ech["displayName"];
                                $item["itemMeta"]["enchantments"][$k][
                                    "description"
                                ] = $ech["description"];
                            }
                        }
                    }
                }
                if($convertSlotIndex)
                    $inventory[$item['slot']] = $item;
                else
                    array_push($inventory, $item);
            }
        } else {
            $inventory = [];
        }
        return $inventory;
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function token_revoke(Request $request){
        $validator = Validator::make($request->all(), [
            'token_id' => 'required|int'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Une erreur est survenue lors de la validation de la requête"));
        }

        $token = TokenUsers::where('id', $request->token_id)->first();
        if($token == null) return redirect()->back()->with("status", $this->toastResponse('error', "Le token n'existe plus ou a expiré"));

        $token->delete();
        return redirect()->back()->with("status", $this->toastResponse('success', "Le token a bien été révoqué"));
    }

    public function username(Request $request){
        return Inertia::render('Profile/Username/Index', [
            'aCAC' => $this->checkAlreadyChangeName($request)
        ]);
    }

    public function username_handle(Request $request){
        if(User::where('name', $request->username)->count())
            return redirect()->route('profile.username')->with("status", $this->toastResponse('error', "Ce pseudo est déjà utilisé"));
        
        $patternUsername = "/^[A-Z0-9_]{3,16}$/i";
        if(!preg_match($patternUsername, $request->username))
            return redirect()->route('profile.username')->with("status", $this->toastResponse('error', "Votre pseudo n'est pas valide."));

        if($request->username == $request->user()->name)
            return redirect()->route('profile.username')->with("status", $this->toastResponse('error', "Pour valider, vous devez changer d'abord de pseudo."));

        $aCN = $this->checkAlreadyChangeName($request);
        if($aCN['result'])
            return redirect()->route('profile.username')->with("status", $this->toastResponse('error', "Vous avez déjà changer de pseudo, vous devez attendre ".$aCN['diff']." jours pour rechanger de pseudo."));
    
        $firstChange = true;
        $dateDefine = $request->user()->created_at;
        if($aCN['alreadyChange'])
            $firstChange = false;

        if($firstChange){
            UserHName::insert([
                "user_id" => $request->user()->id,
                "username" => $request->user()->name,
                "created_at" => $dateDefine
            ]);
        }
    
        UserHName::insert([
            "user_id" => $request->user()->id,
            "username" => $request->username
        ]);
    
    
        $request->user()->update(["name" => $request->username, "updated_at" => now()]);

        return redirect()->route('profile.username')->with("status", $this->toastResponse('success', "Votre pseudo a bien été changé ! Si votre jeu était déjà ouvert, veuillez le relancer."));
    }

    public function checkAlreadyChangeName(Request $request){
        $alreadyChangeName = UserHName::where('user_id', '=', $request->user()->id)->orderBy('created_at', 'desc')->latest()->first();
        if($alreadyChangeName !== null){
            $now   = time();
            $date2 = strtotime($alreadyChangeName->created_at);
            $diffDayCooldown = (int) dateDiff($date2, $now)['day'];
            if($diffDayCooldown !== null){
                if($diffDayCooldown < 30)
                    return ["result" => true, "alreadyChange" => true, "date" => date('d/m/y', strtotime($alreadyChangeName->created_at)), "diff" => $diffDayCooldown+1];
            }
        }
        return ["result" => false, "alreadyChange" => (($alreadyChangeName !== null) ? true : false), "date" => "", "diff" => ""];
    }

    public function skin_update(Request $request){

        $rules = ['typeSkin' => 'required|string'];

        if($request->skinFile !== null)
            $rules = array_merge($rules, ['skinFile' => ['mimes:png', SkinAPI::getRule('skin')]]);

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Une erreur est survenue lors de la validation de la requête"));
        }

        if($request->typeSkin !== "steve" && $request->typeSkin !== "alex")
            return redirect()->back()->with("status", $this->toastResponse('error', "La valeur du type de skin n'est pas valide (steve, alex)"));

        if($request->skinFile !== null){
            $request->file('skinFile')->storeAs('skins', "{$request->user()->id}.png", 'public');
            $skin = ApiSkins::where('uuid', '=', $request->user()->uuid)->first();
            if($skin == null)
                ApiSkins::create([
                    'uuid' => $request->user()->uuid,
                    'sha1' => sha1_file($request->file('skinFile')->getRealPath())
                ]);
            else
                $skin->update([
                    'uuid' => $request->user()->uuid,
                    'sha1' => sha1_file($request->file('skinFile')->getRealPath())
                ]);
        }

        $request->user()->update(['isSlim' => $request->typeSkin]);

        return redirect()->back()->with("status", $this->toastResponse('success', "Votre skin a bien été mis à jour"));
    }

    public function confirmPassword(Request $request){

        $validator = Validator::make($request->all(), [
            'password' => ['required', 'current_password'],
        ]);

        if ($validator->fails()) {
            return response()->json(['state' => 'error', 'msg' => "Le mot de passe semble incorrecte"]);
        }

        return response()->json(['state' => 'success', 'msg' => "Mot de passe validé"]);
    }

    public function confirmMailSend(Request $request){

        Mail::to($request->user())->send(new ConfirmMail($request, 'Obtenir les codes de secours 2FA'));

        return redirect()->back();
    }

    public function confirmMailCode(Request $request){

        $validator = Validator::make($request->all(), [
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json(['state' => 'error', 'msg' => "Le code de confirmation semble invalide"]);
        }

        $emailIdent = EmailIdentify::where('user_id', $request->user()->id)->first();

        if(!Hash::check($request->password, $emailIdent->code))
            return response()->json(['state' => 'error', 'msg' => "Le code de confirmation est invalide."]);

        $emailIdent->delete();

        return response()->json(['state' => 'success', 'msg' => "Identité confirmée"]);
    }
}
