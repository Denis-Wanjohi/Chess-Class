<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlayController;
use App\Http\Controllers\ChallangeController;
use App\Http\Controllers\PuzzlesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout',[AuthenticatedSessionController::class,'destroy']);

    Route::post('/upload-puzzle', [PuzzlesController::class, 'create']);
    Route::get('/puzzles', [PuzzlesController::class, 'puzzles']);
    Route::post('/puzzle-update',[PuzzlesController::class,'update']);
    Route::post('/play', [PlayController::class, 'play']);
    Route::post('/play/232323', [PlayController::class, 'currentGame']);
    Route::post('/play/{id}', [PlayController::class, 'currentGame']);
    Route::post('/move/{id}', [PlayController::class, 'play']);
    Route::get('/players',[HomeController::class,'players']);

    Route::post('/challange',[ChallangeController::class,'create']);
    Route::post('/challenge-accepted/{id}',[ChallangeController::class,'challengeAccept']);
    Route::post('/active-challanges',[ChallangeController::class,'activeChallanges']);
    Route::post('/cancel-challenge/{id}',[ChallangeController::class,'cancelChallenge']);
    Route::post('/cancel-allgames',[PlayController::class,'cancelGames']);
});


Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware('guest')
                ->name('register');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->middleware('guest')
                ->name('login');