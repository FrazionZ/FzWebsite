import './bootstrap';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Head } from '@inertiajs/react';

<Head>
    <link rel="icon" href="{{ asset('/resources/assets/img/logo.svg') }}" />
</Head>


const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'FrazionZ';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <App {...props} />
        );
    },
    progress: {
        color: '#E48515',
        showSpinner: true,
    },
});
