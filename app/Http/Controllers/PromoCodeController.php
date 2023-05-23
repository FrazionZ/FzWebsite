<?php

namespace App\Http\Controllers;

use App\Models\FactionProfile;
use App\Models\PromoCode;
use App\Models\PromoCodeHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PromoCodeController extends Controller
{
    
    public function useCode(Request $request) {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $promoCode = PromoCode::where('code', $request->input('code'))->first();
        if($promoCode == null) return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', "Code invalide."));

        $historyPromoCode = PromoCodeHistory::where('pc_id', $promoCode->id)->get();
        $historyPromoCodeUser = PromoCodeHistory::where('pc_id', $promoCode->id)->where('user_id', $request->user()->id)->get();
        
        if(count($historyPromoCodeUser) >= $promoCode->max_use_per_user) return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', "Vous avez déjà utilisé ce code."));
        if(count($historyPromoCode) >= $promoCode->max_use) return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', "Ce code a expiré."));

        if($promoCode->expire_date !== null){
            $dateNow = date('Y-m-d');
            if(str_starts_with($promoCode->expire_date, $dateNow)) return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', "Ce code a expiré."));    
        }
        
        if($promoCode->type == "pbs") {
            $balance = $request->user()->money;
            $newBalance = $balance + $promoCode->give_amount;
            $request->user()->update(['money' => $newBalance]);
        }else if($promoCode->type == "coins") {
            $fzProfile = FactionProfile::where('uuid', $request->user()->uuid)->first();
            if($fzProfile == null) return redirect()->back()->with('result', false)->with("status", $this->toastResponse('error', "Vous devez rejoindre le serveur au moins une fois pour utiliser ce code."));
            $balance = $fzProfile->money;
            $newBalance = $balance + $promoCode->give_amount;
            $fzProfile->update(['money' => $newBalance]);
            $this->sendSocketServer($request, $fzProfile);
        }

        PromoCodeHistory::create([
            'user_id' => $request->user()->id,
            'pc_id' => $promoCode->id
        ]);

        return redirect()->back()->with('result', true)->with('dataReset', $promoCode)->with('status', $this->toastResponse('success', "Vous venez de valider ce code."));
    }

    public function sendSocketServer($request, $fzProfile){
        $client = new \WebSocket\Client("ws://194.9.172.246:4667/v1/ws/update/coins", [
            'headers' => [
                'Sec-WebSocket-Version' => '13',
                'origin' => '*',
                'key' => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            ],
        ]);
        $updateMoney = ['uuid' => $request->user()->uuid, 'money' => $fzProfile->money];
        $client->send(json_encode($updateMoney));
        $client->receive();
        $client->close();
    }

}
