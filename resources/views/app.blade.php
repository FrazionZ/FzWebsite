<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'FrazionZ') }}</title>

        <link rel="icon" href="{{ asset('/logo.svg') }}" />

        <meta property="og:title" content="Accueil">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://frazionz.net">
        <meta property="og:image" content="{{ asset('/logo.svg') }}">
        <meta property="og:description" content="">
        <meta property="og:site_name" content="FrazionZ">
        <meta name="theme-color" content="#0e1014">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

        <link
        rel="stylesheet"
        href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
    <script>
        const global = globalThis;
    </script>
</html>
