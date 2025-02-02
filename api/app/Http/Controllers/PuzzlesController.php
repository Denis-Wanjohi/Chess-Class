<?php

namespace App\Http\Controllers;

use App\Models\Puzzles;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PuzzlesController extends Controller
{
    /**
     * create puzzle
     */
    public function create(){
        // throw new Exception(request('solution'));
        $puzzle = Puzzles::create([
            'puzzle' => request('puzzle'),
            'solution' => request('solution'),
        ]);
        
        return $puzzle;
    }
    /**
     * get created puzzles
     */
    public function puzzles(){
        return Puzzles::where('player_id',Auth::id())->get();
    }
    /**
     * update on the puzzle
     */
    public function update(){
        Puzzles::where('player_id',Auth::id())
                ->update([
                    'count' => request('player')['count'] + 1,
                    'points' => request('player')['points'], 
                    'played' => json_encode(request('player')['played'])
                ]);
        return Puzzles::where('player_id',Auth::id())->get();

    }
}
