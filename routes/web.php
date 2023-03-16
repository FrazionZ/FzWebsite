<?php

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Social\TwitchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\TwoFAController;
use App\Http\Controllers\Social\DiscordController;
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
    Route::post('/token/revoke', [ProfileController::class, 'token_revoke'])->name('profile.token.revoke');
});


Route::middleware(['2fa'])->name('2fa.')->group(function () {
    Route::get('/2fa/register', [TwoFAController::class, 'register'])->middleware(['auth'])->name('register');
    Route::post('/2fa/enable', [TwoFAController::class, 'enable'])->middleware(['auth'])->name('enable');
    Route::get('/2fa', [TwoFAController::class, 'index'])->middleware(['auth'])->name('index');
    Route::get('/2fa/login', [TwoFAController::class, 'login'])->name('login');
    Route::post('/2fa/login', [TwoFAController::class, 'handleLogin'])->name('handleLogin');
});

Route::middleware(['fzauth'])->prefix('social')->name('social.')->group(function() {
    Route::prefix('discord')->name('discord.')->group(function() {
        Route::get('/start', [DiscordController::class, 'start'])->name('start');
        Route::get('/get', [DiscordController::class, 'get'])->name('get');
        Route::get('/callback', [DiscordController::class, 'callback'])->name('callback');
        Route::post('/unlink', [DiscordController::class, 'unlink'])->name('unlink');
    });
    Route::prefix('twitch')->name('twitch.')->group(function() {
        Route::get('/start', [TwitchController::class, 'start'])->name('start');
        Route::get('/get', [TwitchController::class, 'get'])->name('get');
        Route::get('/callback', [TwitchController::class, 'callback'])->name('callback');
        Route::post('/unlink', [TwitchController::class, 'unlink'])->name('unlink');
    });
});

Route::middleware(['fzauth'])->prefix('candidate')->name('candidate.')->group(function() {
    Route::get('/', [CandidateController::class, 'index'])->name('index');
    Route::get('/create', [CandidateController::class, 'create'])->name('create');
    Route::get('/show/{id}', [CandidateController::class, 'show'])->name('show');
    Route::post('/handleCreate', [CandidateController::class, 'handleCreate'])->name('handleCreate');
    Route::post('/handleComment', [CandidateController::class, 'handleComment'])->name('handleComment');
    Route::patch('/handleSettings', [CandidateController::class, 'handleSettings'])->name('handleSettings')->middleware('permission:admin.candidate.manage');
    Route::get('/paginate/{category}/{page}', [CandidateController::class, 'requestPaginate'])->name('paginate');
});

Route::middleware(['fzauth'])->prefix('forum')->name('forum.')->group(function() {
    
});

Route::get('/complete-registration', [Auth\RegisteredUserController::class, 'completeRegistration'])->name('complete.registration');


Route::get('/maintenance', function() {
    return Inertia::render('Maintenance', []);
})->name('maintenance');

require __DIR__.'/auth.php';
