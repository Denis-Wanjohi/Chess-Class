<?php

namespace App\Http\Controllers;

use App\Events\ChallangeRequest;
use App\Events\PlayGame;
use App\Models\Challange;
use App\Models\Play;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PlayController extends Controller
{
    public function create()
    {
        // Create a new Play instance
        $board = Play::create([
            'board' => request('board')
        ]);
    
        // Broadcast the PlayGame event
        // broadcast(new PlayGame($board,'white'));
        return response()->json($board);
    }

    public function challange(Request $request){
        // new ChallangeRequest()
        broadcast(new ChallangeRequest($request->id));
        $user = User::where('id',$request->id)->get();
        return response()->json([
            'message' => 'Challenge broadcasted to'.$user[0]->username,
            'username'=>$user[0]->username,
            'name'=>$user[0]->fname.' '. $user[0]->lname,
            'id'=>$user[0]->id,
            'country'=>$user[0]->country,
            'email'=>$user[0]->email,
        ]);
        
    }

    public  function play(Request $request){
        logger()->info($request);
        // create the game or update if exist
        $game = Play::where('code',request('code'))->get();
        
        // create
        if($game->isEmpty()){
            logger()->info(request());
            $play = Play::create([
                'challanger' => request('challanger'),
                'receiver' => request('receiver'),
                'isDone' => request('status'),
                'code' => request('code'),
                'color' => request('color'),
                'board' => request('board'),
            ]);
            broadcast(new PlayGame($play->board,$play->color,$play));
            return response()->json($play);
        }
        // update
        else{
         
            Play::where('code',$game[0]->code)
                    ->update([
                        // 'challanger' => request('challanger'),
                        // 'receiver' => request('receiver'),
                        'isDone' => request('status'),
                        // 'code' => request('code'),
                        'color' => request('color'),
                        'board' => request('board'),
                        'captured' => request('capturedPieces'),
                    ]);
            $game = Play::where('code',request('code'))->get()[0];
            // logger()->info($game);
            // 'color' => ($game->color === 'white') ? 'black' : $this->color,
            broadcast(new PlayGame($game->board,($game->color === 'white') ? 'black' : 'white',$game));
            return response()->json($game);
        }
        

    }

    public function currentGame(){
        $game = $this->getCurrentGame(request()['code']);  
        if($game->isEmpty()){
            logger()->info('creating game with code '.request('code'));
            $game = Play::create([
                'code' => request()['code'],
                'challanger' => request()['challanger'],
                'receiver' => request()['receiver'],
                'color' => request()['color'],
                'board' => request()['board'],
                'isDone' => request()['status'],
            ]);
            // logger()->info($game->board." <board  color> ".$game->color);
            // logger()->info($game[0]);
            broadcast(new PlayGame($game->board,$game->color,$game));
            $game = $this->getCurrentGame(request()['code']);  
            logger()->info($game);
            return response()->json($game[0]);
        }
        $data = $game[0];
        if($data['board'] == 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'){
            $data['color'] = 'white';
            broadcast(new PlayGame($game[0]['board'],'white',$game[0]));
        }else{
            broadcast(new PlayGame($game[0]['board'],($game[0]['color'] === 'white') ? 'black' : 'white',$game[0]));
            $data['color'] = ($data['color'] === 'white'?'black':'white');
        }
        // logger()->info($data);
        return response()->json($data);
    }

    public function cancelGames(){
        $game = Play::where('challanger',Auth::id())
                ->orWhere('receiver',Auth::id())
                ->update(['isDone'=>true]);
        $challange = Challange::where('challanger_id',Auth::id())
                ->orWhere('receiver_id',Auth::id())
                ->update(['status'=>true]);
        return response()->json([
            'message' => 'all games deleted'
        ]);

    }



    // P R I V A T E    F U N C T I O N S
    private function getCurrentGame($code)
    {
        return Play::where('code', $code)
            ->get()
            ->where('isDone',0)
            ->map(function ($data) {
                return [
                    'id' => $data->id,
                    'code' => $data->code,
                    'challanger' => User::where('id', $data->challanger)
                        ->get()
                        ->map(function ($user) {
                            return [
                                'id' => $user->id,
                                'email' => $user->email,
                                'username' => $user->username,
                                'name' => $user->fname . ' ' . $user->lname,
                                'country' => $user->country,
                            ];
                        }),
                    'receiver' => User::where('id', $data->receiver)
                        ->get()
                        ->map(function ($user) {
                            return [
                                'id' => $user->id,
                                'email' => $user->email,
                                'username' => $user->username,
                                'name' => $user->fname . ' ' . $user->lname,
                                'country' => $user->country,
                            ];
                        }),
                    'color' => $data->color,
                    'board' => $data->board,
                    'isDone' => $data->isDone,
                    'captured' => $data->captured,
                ];
            });
    }
}
