<?php

namespace App\Http\Controllers;

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
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $promoCode = PromoCode::where('code', $request->input('code'))->first();
        if($promoCode == null) return redirect()->back()->with("status", $this->toastResponse('error', "Code invalide."));

        $historyPromoCode = PromoCodeHistory::where('pc_id', $promoCode->id)->get();
        $historyPromoCodeUser = PromoCodeHistory::where('pc_id', $promoCode->id)->where('user_id', $request->user()->id)->get();
        
        if(count($historyPromoCodeUser) >= $promoCode->max_use_per_user) return redirect()->back()->with("status", $this->toastResponse('error', "Vous avez déjà utilisé ce code."));
        if(count($historyPromoCode) >= $promoCode->max_use) return redirect()->back()->with("status", $this->toastResponse('error', "Ce code a expiré."));

        $dateNow = date('Y-m-d');
        if(str_starts_with($promoCode->expire_date, $dateNow)) return redirect()->back()->with("status", $this->toastResponse('error', "Ce code a expiré."));

        if($promoCode->type == "pbs") {
            $balance = $request->user()->money;
            $newBalance = $balance + $promoCode->give_amount;
            $request->user()->update(['money' => $newBalance]);
        }

        PromoCodeHistory::create([
            'user_id' => $request->user()->id,
            'pc_id' => $promoCode->id
        ]);

        return redirect()->back()->with('status', $this->toastResponse('success', "Vous venez de valider ce code."));
    }

}
