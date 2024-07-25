<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('articles', function ($user) {
    return (int) $user->id;
});

Broadcast::routes(['middleware' => ['auth:sanctum']]);
