<?php

namespace App\Providers;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use App\Models\NavbarElements;
use  Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if(env('APP_ENV', 'local') !== "local")
            \URL::forceScheme('https');
            
        Collection::macro('paginate', function ($perPage, $total = null, $page = null, $pageName = 'page') {
            $page = $page ?: LengthAwarePaginator::resolveCurrentPage($pageName);
        
            return new LengthAwarePaginator($this->forPage($page, $perPage), $total ?: $this->count(), $perPage, $page, [
                'path' => LengthAwarePaginator::resolveCurrentPath(),
                'pageName' => $pageName,
            ]);
        });

        \Illuminate\Support\Facades\URL::forceRootUrl(\Illuminate\Support\Facades\Config::get('app.url'));
        if (str_contains(\Illuminate\Support\Facades\Config::get('app.url'), 'https://')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        Inertia::share([
            'locale' => function () {
                return app()->getLocale();
            },
            'language' => function () {
                if(!file_exists(resource_path('lang/frazionz/'.app()->getLocale() .'.json'))) {
                  return [];
               }
               return json_decode(file_get_contents(
                resource_path('lang/frazionz/' .app()->getLocale() .'.json'))
                , true);
            },
            'errors' => function () {
                return session()->get('errors') ? session()->get('errors')->getBag('default')->getMessages() : (object) [];
            }
        ]);
    }
}
