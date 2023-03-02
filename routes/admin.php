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
        Route::get('/', [UsersController::class, 'index'])->middleware(['permission:admin.users.list'])->name('index');
        Route::post('/search', [UsersController::class, 'search'])->middleware(['permission:admin.users.search'])->name('search');
        Route::get('/edit/{id}', [UsersController::class, 'edit'])->middleware(['permission:admin.user.edit'])->name('edit');
        Route::get('/edit/{id}/role/attach/{role}', [UsersController::class, 'role_attach'])->middleware(['permission:admin.user.role.edit'])->name('role.attach');
        Route::get('/edit/{id}/role/detach/{role}', [UsersController::class, 'role_detach'])->middleware(['permission:admin.user.role.edit'])->name('role.detach');
        Route::post('/edit/save', [UsersController::class, 'save'])->middleware(['permission:admin.user.edit'])->name('edit.save');
        Route::post('/token/revoke', [UsersController::class, 'tokenRevoke'])->middleware(['permission:admin.user.session.revoke'])->name('token.revoke');
    });
        
    Route::prefix('roles')->name('roles.')->group(function() {
        Route::get('/', [RolesController::class, 'index'])->name('index');
        Route::get('/edit/{id}', [RolesController::class, 'edit'])->middleware(['permission:admin.role.edit'])->name('edit');
        Route::post('/swap', [RolesController::class, 'swap'])->middleware(['permission:admin.role.swap'])->name('swap');
        Route::post('/edit/save', [RolesController::class, 'save'])->middleware(['permission:admin.role.edit'])->name('edit.save');
        Route::post('/edit/perms', [RolesController::class, 'perms'])->middleware(['permission:admin.role.edit'])->name('edit.perms');
    });

    Route::prefix('logs')->name('logs.')->group(function() {
        Route::get('/', [LoggerController::class, 'index'])->name('index');
    });
});
