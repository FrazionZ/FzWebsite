<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['web', 'auth:api'])->get('/user', function(Request $request) {
    return $request->user()->makeVisible([
        'email'
    ]);
});

Route::post('skins/update', [App\Http\Controllers\API\SkinsController::class, 'update'])->name('update');
Route::post('resetpwd', [App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store'])->name('resetpwd');