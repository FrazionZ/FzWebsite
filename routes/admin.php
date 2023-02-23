<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\MaintenanceController;
use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [AdminController::class, 'index'])->name('index');

Route::prefix('maintenance')->name('maintenance.')->group(function() {
    Route::get('/', [MaintenanceController::class, 'index'])->name('index');
    Route::post('/handleSubmit', [MaintenanceController::class, 'handleSubmit'])->name('submit');
});

Route::prefix('users')->name('users.')->group(function() {
    Route::get('/', [UsersController::class, 'index'])->name('index');
    Route::get('/edit/{id}', [UsersController::class, 'edit'])->name('edit');
    Route::post('/edit/save', [UsersController::class, 'save'])->name('edit.save');
    Route::post('/token/revoke', [UsersController::class, 'tokenRevoke'])->name('token.revoke');
});
