<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('articles', function ($user) {
    return (int) $user->id;
});

Broadcast::channel('bills', function ($user) {
    return (int) $user->id;
});

Broadcast::channel("notifications.{id}", function ($user ,$id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel("products", function ($user) {
    return (int) $user->id;
});

Broadcast::channel("users", function ($user) {
    $id = auth()->id();
    return (int) $user->id === (int) $id ? $user : null;
});

Broadcast::routes(['middleware' => ['auth:sanctum']]);
