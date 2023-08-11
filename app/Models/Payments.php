<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Payments extends Model
{
    use HasFactory;

    public static function pagination($perPage = 10, $url, $page){
        $storeCredits = Payments::orderBy('created_at', 'desc')->where('payer_userid', Auth::user()->id)->paginate($perPage, ['*'], $url, $page);
        foreach($storeCredits as $sa){
            $sa->offer = CreditOffers::select('id', 'price', 'money')->where('id', $sa->payer_offerid)->first();
            if($sa->offer != null){
                $creditOfferGateway = CreditOfferGateways::where('offer_id', $sa->offer->id)->first();
                if($creditOfferGateway != null ){
                    $sa->offer->type = CreditGateways::select('id', 'name')->where('id', $creditOfferGateway->gateway_id)->first();
                }
            }
        }
        return $storeCredits;
    }
}
