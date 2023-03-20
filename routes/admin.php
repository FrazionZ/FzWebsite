<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\MaintenanceController;
use App\Http\Controllers\Admin\RolesController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\LoggerController;
use App\Http\Controllers\Admin\GithubController;
use App\Http\Controllers\Admin\ForumController;
use App\Http\Controllers\Admin\Github\ReposController;
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
    
    Route::prefix('github')->middleware(['web'])->name('github.')->group(function() {
        Route::get('/auth/start', [GithubController::class, 'start'])->name('auth.start');
        Route::get('/auth/callback', [GithubController::class, 'callback'])->name('auth.callback');
    });

    Route::prefix('github')->middleware(['web', 'gauth'])->name('github.')->group(function() {
        Route::get('/', [GithubController::class, 'index'])->name('index');
        Route::get('/repos/{id}', [ReposController::class, 'index'])->name('repos.index');
        Route::get('/repos/{id}/create', [ReposController::class, 'create'])->name('repos.create');

        Route::post('/repos/draft/create', [ReposController::class, 'draft_create'])->name('repos.draft.create');
        Route::get('/repos/{id}/tag/check/{tag}', [ReposController::class, 'draft_check_tag_exist'])->name('repos.tag.check');
        Route::post('/repos/draft/asset/store', [ReposController::class, 'draft_asset_store'])->name('repos.draft.asset.store');
        Route::put('/repos/draft/asset/upload', [ReposController::class, 'draft_asset_upload'])->name('repos.draft.asset.upload');
        Route::post('/repos/draft/update', [ReposController::class, 'draft_update'])->name('repos.draft.update');
    });

    Route::prefix('forum')->middleware(['web'])->name('forum.')->group(function() {
        Route::get('/categories', [ForumController::class, 'categories_index'])->name('categories.index');
        Route::post('/categories/swap', [ForumController::class, 'categories_swap'])->name('categories.swap');
        Route::post('/subcategories/swap', [ForumController::class, 'subcategories_swap'])->name('subcategories.swap');
        Route::get('/category/edit/{id}', [ForumController::class, 'category_edit'])->name('category.edit');
        Route::get('/subcategory/edit/{id}', [ForumController::class, 'subcategory_edit'])->name('subcategory.edit');
        Route::post('/subcategory/role/attach', [ForumController::class, 'subcategory_role_attach'])->name('subcategory.role.attach');
        Route::post('/subcategory/role/detach', [ForumController::class, 'subcategory_role_detach'])->name('subcategory.role.detach');
        Route::post('/subcategory/save', [ForumController::class, 'subcategory_save'])->name('subcategory.save');
        Route::post('/category/save', [ForumController::class, 'category_save'])->name('category.save');
        Route::get('/subcategories', [ForumController::class, 'subcategories_index'])->name('subcategories.index');
    });
});
