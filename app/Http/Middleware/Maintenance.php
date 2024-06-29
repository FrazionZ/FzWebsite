<?php

namespace App\Http\Middleware;

use App\Models\Config;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class Maintenance
{
    
    private $routeExcluded = [
        'maintenance',
        'login',
        'login.*',
        '2fa',
        '2fa.*',
        'password',
        'password.*',
        'logout',
        'admin',
        'admin.*',
    ];


    public function handle(Request $request, Closure $next)
    {
        if (!config('frazionz.maintenance.state', false)) {
            return $next($request);
        }

        if ($request->routeIs($this->routeExcluded)) {
            return $next($request);
        }

        if ($request->user() !== null && $request->user()->isAdmin()) {
            return $next($request);
        }

        if ($request->user() !== null && $request->user()->hasPermission('admin.maintenance.bypass')) {
            return $next($request);
        }

        return $this->renderMaintenanceView();
    }

    protected function renderMaintenanceView()
    {
        $maintenanceMessage = base64_decode(config('frazionz.maintenance.message'));

        return Inertia::render('Maintenance', [
            'maintenanceMessage' => $maintenanceMessage,
        ]);
    }
}
