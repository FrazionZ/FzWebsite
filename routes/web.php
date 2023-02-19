<?php

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\TwoFAController;
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

Route::get('/', function () {
    return Inertia::render('Home', []);
})->name('index');

Route::get('/launcher', function () {
    return Inertia::render('Launcher', [ ]);
});

Route::middleware('fzauth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['2fa'])->group(function () {
    Route::get('/2fa/register', [TwoFAController::class, 'register'])->middleware(['auth'])->name('2fa.register');
    Route::post('/2fa/enable', [TwoFAController::class, 'enable'])->middleware(['auth'])->name('2fa.enable');
    Route::get('/2fa/login', [TwoFAController::class, 'login'])->name('2fa.login');
    Route::post('/2fa/login', [TwoFAController::class, 'handleLogin'])->name('2fa.handleLogin');
});

Route::middleware(['fzauth'])->prefix('candidate')->name('candidate.')->group(function() {
    Route::get('/', [CandidateController::class, 'index'])->name('index');
    Route::get('/create', [CandidateController::class, 'create'])->name('create');
    Route::get('/show/{id}', [CandidateController::class, 'show'])->name('show');
    Route::post('/handleCreate', [CandidateController::class, 'handleCreate'])->name('handleCreate');
    Route::post('/handleComment', [CandidateController::class, 'handleComment'])->name('handleComment');
    Route::patch('/handleSettings', [CandidateController::class, 'handleSettings'])->name('handleSettings');
    Route::get('/paginate/{category}/{page}', [CandidateController::class, 'requestPaginate'])->name('paginate');
});

Route::get('/complete-registration', [Auth\RegisteredUserController::class, 'completeRegistration'])->name('complete.registration');

require __DIR__.'/auth.php';
