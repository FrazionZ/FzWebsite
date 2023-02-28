<?php

namespace App\Exceptions;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {

        $userLevelCheck = $e instanceof \jeremykenedy\LaravelRoles\App\Exceptions\RoleDeniedException ||
            $e instanceof \jeremykenedy\LaravelRoles\App\Exceptions\PermissionDeniedException ||
            $e instanceof \jeremykenedy\LaravelRoles\App\Exceptions\LevelDeniedException;
        
        if ($userLevelCheck) {

            $uri = explode('/', Route::getCurrentRoute()->uri)[0];
            
            if ($request->expectsJson()) {
                return redirect($uri)->back()->with('status', ["type" => 'error', "msg" => "Vous n'avez pas la permission pour cette requête"]);
            }
            
            return redirect($uri)->with('status', ["type" => 'error', "msg" => "Vous n'avez pas la permission pour cette requête"]);
        }

        $response = parent::render($request, $e);

        return Inertia::render('Error', ['status' => $response->status()])
            ->toResponse($request)
            ->setStatusCode($response->status());
    }
}
