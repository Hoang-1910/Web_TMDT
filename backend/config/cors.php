<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173',   // FE dev
        'http://127.0.0.1:5173',   // FE dev (nếu dùng 127)
        // thêm domain production ở đây nếu có, ví dụ:
        // 'https://myfrontend.com',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
