<?php

use App\Http\Controllers\Auth\Oauth\AuthorizationController;
use App\Http\Controllers\Auth\TwoFAController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\CapesController;
use App\Http\Controllers\Forum\ThreadController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PromoCodeController;
use App\Http\Controllers\Social\DiscordController;
use App\Http\Controllers\Social\TwitchController;
use App\Http\Controllers\SupportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home', []);
})->name('index');

Route::get('/launcher', function () {
    return Inertia::render('Launcher', [ ]);
});

Route::post('/promoCodeUse', [PromoCodeController::class, 'useCode'])->name('promocode.use_code');

Route::middleware('fzauth')->prefix('profile')->name('profile.')->group(function () {
    Route::get('/', [ProfileController::class, 'index'])->name('index');
    Route::get('/username', [ProfileController::class, 'username'])->name('username');
    Route::post('/username', [ProfileController::class, 'username_handle'])->name('username.handle');
    Route::post('/skin/update', [ProfileController::class, 'skin_update'])->name('skin.update');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    Route::post('/token/revoke', [ProfileController::class, 'token_revoke'])->name('token.revoke');
});

//Confirm Data Profile Session
Route::middleware('fzauth')->group(function () {
    Route::post('/password/confirm', [ProfileController::class, 'confirmPassword'])->name('frazion.password.confirm');
    Route::post('/mail/send', [ProfileController::class, 'confirmMailSend'])->name('frazion.mail.send');
    Route::post('/mail/confirm', [ProfileController::class, 'confirmMailCode'])->name('frazion.email.confirm');
});

Route::middleware(['2fa'])->name('2fa.')->group(function () {
    Route::get('/2fa/register', [TwoFAController::class, 'register'])->middleware(['fzauth'])->name('register');
    Route::post('/2fa/disable', [TwoFAController::class, 'disable'])->middleware(['fzauth'])->name('disable');
    Route::post('/2fa/enable', [TwoFAController::class, 'enable'])->middleware(['fzauth'])->name('enable');
    Route::get('/2fa', [TwoFAController::class, 'index'])->middleware(['fzauth'])->name('index');
    Route::post('/2fa/regenerate', [TwoFAController::class, 'regenerate'])->middleware(['fzauth'])->name('regenerate');
    Route::get('/2fa/login', [TwoFAController::class, 'login'])->name('login');
    Route::post('/2fa/login', [TwoFAController::class, 'handleLogin'])->name('handleLogin');
});

Route::middleware(['fzauth'])->prefix('social')->name('social.')->group(function() {
    Route::prefix('discord')->name('discord.')->group(function() {
        Route::get('/start', [DiscordController::class, 'start'])->name('start');
        Route::get('/get', [DiscordController::class, 'get'])->name('get');
        Route::get('/callback', [DiscordController::class, 'callback'])->name('callback');
        Route::get('/refresh', [DiscordController::class, 'refreshAllToken'])->name('refresh');
        Route::post('/unlink', [DiscordController::class, 'unlink'])->name('unlink');
    });
    Route::prefix('twitch')->name('twitch.')->group(function() {
        Route::get('/start', [TwitchController::class, 'start'])->name('start');
        Route::get('/get', [TwitchController::class, 'get'])->name('get');
        Route::get('/callback', [TwitchController::class, 'callback'])->name('callback');
        Route::get('/refresh', [TwitchController::class, 'refreshAllToken'])->name('refresh');
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
    Route::get('/', [ForumController::class, "index"])->name('index');
    Route::get('/thread/create/{sc_id}', [ThreadController::class, 'create_form'])->name('thread.create.form');
    Route::post('/thread/create/handle', [ThreadController::class, 'create_handle'])->name('thread.create.handle');
    Route::get('/thread/view/{th_id}', [ForumController::class, 'thread_view'])->name('thread.view');
    Route::post('/thread/actions/pinned', [ThreadController::class, "actions_pinned"])->name('thread.actions.pinned');
    Route::post('/thread/actions/locked', [ThreadController::class, "actions_locked"])->name('thread.actions.locked');
    Route::post('/thread/comment/publish', [ThreadController::class, 'comment_publish'])->name('thread.comment.publish');
    Route::post('/threads/comment/paginate', [ThreadController::class, "comment_paginate"])->name('thread.comment.paginate');
    Route::get('/threads/paginate/{sc_id}/{page}', [ForumController::class, "threads_paginate"])->name('threads.paginate');
    Route::post('/threads/paginate', [ForumController::class, "threads_paginate"])->name('threads.paginate');
});

Route::middleware(['fzauth'])->prefix('support')->name('support.')->group(function() {
    Route::get('/', [SupportController::class, 'index'])->name('index');
    Route::get('/create', [SupportController::class, 'create'])->name('create');
    Route::post('/create', [SupportController::class, 'create_handle'])->name('create.handle');
    Route::get('/view/{id}', [SupportController::class, 'view'])->name('view');
    Route::post('/messages', [SupportController::class, 'gettingMessages'])->name('gettingMessages');
    Route::post('/sendAnswer', [SupportController::class, 'sendAnswer'])->name('sendAnswer');
});

Route::middleware(['fzauth'])->prefix('capes')->name('capes.')->group(function() {
    Route::get('/', [CapesController::class, 'index'])->name('index');
});


Route::middleware(['fzauth'])->prefix('twitch')->name('twitch.')->group(function() {
    Route::get('/', [TwitchController::class, "index"])->name('index');
    Route::get('/watch/{uid}', [TwitchController::class, "watch"])->name('watch');
});

Route::get('page/{slug}', [PagesController::class, 'display'])->name('page.display');

Route::get('/complete-registration', [Auth\RegisteredUserController::class, 'completeRegistration'])->name('complete.registration');


//Oauth
Route::middleware('web')->get('oauth/authorize', [AuthorizationController::class, 'authorize'])->name('passport.oauth.authorize');
Route::middleware('web')->get('oauth/twofa', [AuthorizationController::class, 'authorize'])->name('passport.oauth.twofa');


Route::get('/maintenance', function() {
    return Inertia::render('Maintenance', []);
})->name('maintenance');

require __DIR__.'/auth.php';
