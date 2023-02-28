<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\MaintenanceController;
use App\Http\Controllers\Admin\RolesController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\LoggerController;
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
Route::middleware(['permission:admin.access'])->group(function() {
    Route::get('/', [AdminController::class, 'index'])->name('index');

    Route::middleware(['permission:admin.maintenance'])->prefix('maintenance')->name('maintenance.')->group(function() {
        Route::get('/', [MaintenanceController::class, 'index'])->name('index');
        Route::post('/handleSubmit', [MaintenanceController::class, 'handleSubmit'])->name('submit');
    });
        
    Route::prefix('users')->name('users.')->group(function() {
        Route::get('/', [UsersController::class, 'index'])->name('index');
        Route::post('/search', [UsersController::class, 'search'])->name('search');
        Route::get('/edit/{id}', [UsersController::class, 'edit'])->name('edit');
        Route::get('/edit/{id}/role/attach/{role}', [UsersController::class, 'role_attach'])->name('role.attach');
        Route::get('/edit/{id}/role/detach/{role}', [UsersController::class, 'role_detach'])->name('role.detach');
        Route::post('/edit/save', [UsersController::class, 'save'])->name('edit.save');
        Route::post('/token/revoke', [UsersController::class, 'tokenRevoke'])->name('token.revoke');
    });
        
    Route::prefix('roles')->name('roles.')->group(function() {
        Route::get('/', [RolesController::class, 'index'])->name('index');
        Route::get('/edit/{id}', [RolesController::class, 'edit'])->name('edit');
        Route::post('/edit/save', [RolesController::class, 'save'])->name('edit.save');
    });

    Route::prefix('logs')->name('logs.')->group(function() {
        Route::get('/', [LoggerController::class, 'index'])->name('index');
    });
});
