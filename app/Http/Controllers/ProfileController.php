<?php

namespace App\Http\Controllers;

use Adrianorosa\GeoLocation\GeoLocation;
use App\Http\Controllers\Social\DiscordController;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\FactionProfile;
use App\Models\TokenUsers;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function index(Request $request): Response
    {
        $fastMenu = $request->query('fastMenu');
        $factionProfile = json_decode(@file_get_contents('https://api.frazionz.net/faction/profile/'.$request->user()->id), true);
        $capeData = json_decode(@file_get_contents('https://api.frazionz.net/user/'.$request->user()->id.'/cape/data'), true);
        $tokenUsers = TokenUsers::where('uid', $request->user()->id)->get();
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
}
