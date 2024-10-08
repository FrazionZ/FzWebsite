<?php

return [
    /*
     * The Client ID to use for requests.
     */ 
    
    'client_id' => '2rlyh4f7k4f0gv3jyds1p3jxmk7fyy',

    /*
     * The Client Secret to use for OAuth requests.
     */
    'client_secret' => 'wp9cyszdair7l0buso4ks291ewpzkg',

    /*
     * The Redirect URI to use for generating OAuth authorization.
     */
    'redirect_url' => env('TWITCH_HELIX_REDIRECT_URI'),

    'oauth_client_credentials' => [
        /*
         * Since May 01, 2020, Twitch requires all API requests to contain a valid Access Token.
         * This can be achieved with the Client Credentials flow.
         *
         * The package will attempt to generate a Access Token for unauthenticated requests.
         * NOTICE: This will only be enabled if a Client ID and Client Secret have been specified.
         */
        'auto_generate' => true,

        /*
         * Enable caching the Access Token to minimize workload.
         */
        'cache' => true,

        /*
        * The cache store to use for storing Client Credentials.
        */
        'cache_store' => null,

        /*
         * The cache key to use for storing information.
         */
        'cache_key' => 'twitch-api-client-credentials',
    ],

    'eventsub' => [
        /*
         * Secret used to generate the signature.
         */
        'secret' => env('TWITCH_HELIX_EVENTSUB_SECRET'),

        /*
         * Maximum difference (in seconds) allowed between the header's timestamp and the current time.
         */
        'tolerance' => 600,
    ],
];
