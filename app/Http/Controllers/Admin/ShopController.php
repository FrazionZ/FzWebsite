<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ShopItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ShopController extends Controller
{
    

    public function items(Request $request){
        $shopItems = new ShopItems();
        $shopItems = $shopItems->pagination(10, 'page', $request->query('page', 0), false);
        return Inertia::render('Admin/Shop/Items', [
            'items' => $shopItems
        ]);
    }

    public function create_items(Request $request){
        return Inertia::render('Admin/Shop/ItemsCreate', []);
    }

    public function search_items(Request $request){
        $validator = Validator::make($request->all(), [
            'search' => 'required|string',
            'currentPage' => 'required|int',
        ]);

        
        $shopItems = new ShopItems();

        if ($validator->fails()) {
            return response()->json($shopItems->pagination(10, 'page', $request->currentPage, false));
        }

        return response()->json($shopItems->pagination(10, 'page', $request->currentPage, $request->search));
    }
    public function categories(){
        return Inertia::render('Admin/Shop/Categories', []);
    }


}
