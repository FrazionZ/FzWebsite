<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Skins;
use App\Models\TokenUsers;
use App\Models\User;
use Illuminate\Http\Request;

use App\Models\CapesUsers;
use App\Http\Requests\SkinAPI;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SkinsController extends Controller
{
    
    public function update(Request $request)
    {
        $this->validate($request, [
            'access_token' => 'required|string',
            'type' => 'required|string',
            'capeID' => 'required|string',
            'skin' => ['required', 'mimes:png', SkinAPI::getRule('skin')],
        ]);

        
        /*$tokenUsers = new TokenUsers();
        $tokenObject = $tokenUsers->where('token', $request->input('access_token'))->first();
        if($tokenObject == null)
            return response()->json(['status' => false, 'message' => 'Invalid token'], 200);*/

        $user = User::firstWhere('id', "1");

        if ($user === null)
            return response()->json(['status' => false, 'message' => 'User not found'], 200);

        if ($user->isBanned())
            return response()->json(['status' => false, 'message' => 'User banned'], 200);

        if($request->input('type') !== "steve" && $request->input('type') !== "alex")
            return response()->json(['status' => false, 'message' => 'Type skin not allowed'], 200);

        $user->update(['isSlim' => $request->input('type')]);

        $request->file('skin')->storeAs('skins', "{$user->id}.png", 'public');

        $skin = Skins::where('uuid', '=', $user->uuid)->first();
        if($skin == null){
            Skins::create([
                'uuid' => $user->uuid,
                'sha1' => sha1_file($request->file('skin')->getRealPath())
            ]);
        }else{
            $skin->update([
                'uuid' => $user->uuid,
                'sha1' => sha1_file($request->file('skin')->getRealPath())
            ]);
        }

        $cape = CapesUsers::where('uuid', '=', $user->uuid)->first();
        if($cape == null){
            CapesUsers::create([
                'uuid' => $user->uuid,
                'cape_id' => $request->input('capeID')
            ]);
        }else{
            $cape->update([
                'uuid' => $user->uuid,
                'cape_id' => $request->input('capeID')
            ]);
        }

        return response()->json(['status' => true, 'message' => 'Skin updated', 'base64' => base64_encode(file_get_contents($request->file('skin')))], 200);
    }
}
