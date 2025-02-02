<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    function players (){
    $players = User::where('id', '!=', Auth::id())->get()->map(function($player){
            return [
                'id'=> $player->id,
                'name'=> $player->fname . ' '. $player->lname,
                'username'=> $player->username,
                'email'=> $player->email,
                'country'=> $player->country,
            ];
        });
        return response($players);
    }
}
