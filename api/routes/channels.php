<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('channel-playGame', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('online-users', function ($user) {
    return ['id' => $user->id,];
});
Broadcast::channel('challange-request.{$user}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('challange-accepted.{$user}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});