<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PromoCode;
use App\Models\PromoCodeHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PromoCodeController extends Controller
{
    
    
    public function index(Request $request) {
        $promoCodes = $this->paginatePromoCode($request->query('page', 0));
        return Inertia::render('Admin/PromoCode/Index', [
            'promoCodes' => $promoCodes
        ]);
    }

    public function search(Request $request){
        $validator = Validator::make($request->all(), [
            'search' => 'required|string',
            'currentPage' => 'required|int',
        ]);

        if ($validator->fails()) {
            return response()->json($this->paginatePromoCode($request->currentPage));
        }

        return response()->json($this->paginatePromoCode($request->currentPage, $request->search));
    }

    public function paginatePromoCode($pageCurrent = 0, $search = null){
        $promoCodes = PromoCode::where('code', 'LIKE', '%'.$search.'%')->orderBy('created_at', 'desc')->paginate(
            10, ['*'], 'page', ($search !== null) ? 0 : $pageCurrent
        );

        foreach($promoCodes as $promoCode){
            $promoCode->expired = $promoCode->isExpired();
        }

        return $promoCodes;
    }

    public function add(Request $request) {
        return Inertia::render('Admin/PromoCode/Add', []);
    }
    
    public function add_submit(Request $request) {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|unique:'.PromoCode::class,
            'max_use' => 'required|integer',
            'max_use_per_user' => 'required|integer',
            'give_amount' => 'required|integer',
            'type' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        if($request->input('give_amount') < 1){
            return redirect()->back()->with("status", $this->toastResponse('error', "Le montant à donner ne peut pas être inférieur à 1"));
        }

        PromoCode::create($request->all());

        return redirect()->route('admin.promocode.index')->with("status", $this->toastResponse('success', "Le code promo a bien été créé"));
    }

    public function edit(Request $request, $id){
        $promoCode = PromoCode::where('id', $id)->first();
        if($promoCode == null) abort(404);
        $promoCodeUses = PromoCodeHistory::where('pc_id', $promoCode->id)->first();
        $pchLog = new PromoCodeHistory();
        $pchLog = $pchLog->pagination(10, 'pch', $request->query('pch', 0), true, $promoCode->id);
        return Inertia::render('Admin/PromoCode/Edit', [
            'promoCode' => $promoCode,
            'promoCodeUses' => $pchLog
        ]);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'code' => 'required|string',
            'max_use' => 'required|integer',
            'max_use_per_user' => 'required|integer',
            'give_amount' => 'required|integer',
            'type' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        if($request->input('give_amount') < 1){
            return redirect()->back()->with("status", $this->toastResponse('error', "Le montant à donner ne peut pas être inférieur à 1"));
        }

        $promoCodeEdit = PromoCode::where('id', $request->input('id'))->first();
        if($promoCodeEdit == null) return redirect()->back()->with("status", $this->toastResponse('error', "Le code promo est inexistant"));

        //Check if code exist
        $checkPromoCode = PromoCode::where('code', $request->input('code'))->first();
        if($checkPromoCode !== null){
            if($checkPromoCode->id !== $promoCodeEdit->id){
                if($checkPromoCode->code == $request->input('code')) return redirect()->back()->with("status", $this->toastResponse('error', "Le code promo est déjà existant."));
            }
        }
        
        $promoCodeEdit->update($request->except(['_token']));
        
        return redirect()->back()->with("status", $this->toastResponse('success', "Le code promo a bien été mis à jour"));

    }

    public function delete(Request $request) {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with("status", $this->toastResponse('error', "Le formulaire est invalide ou incomplet"));
        }

        $promoCode = PromoCode::where('id', $request->input('id'));
        if($promoCode == null) return redirect()->back()->with("status", $this->toastResponse('error', "Le code promo est inexistant"));
        
        $promoCode->delete();
        
        return redirect()->back()->with("status", $this->toastResponse('success', "Le code promo a bien été supprimé"));
    }

}
