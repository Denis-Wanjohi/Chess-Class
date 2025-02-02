<?php

namespace App\Http\Controllers;

use App\Events\ChallangeAccept;
use Illuminate\Http\Request;
use App\Events\ChallangeRequest;
use App\Models\Challange;
use App\Models\User;
use App\Models\Play;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ChallangeController extends Controller
{
    public function create(Request $request){
        // broadcast(new ChallangeRequest($request->id));
        $challanges = Challange::where(function ($query) {
            $query->where('challanger_id', Auth::id())
                  ->orWhere('receiver_id', Auth::id());
        })->where('status', 0)->get();
        logger()->info("challanges");
        logger()->info($challanges);

        if($challanges->isEmpty()){
            $challangeData = Challange::create([
                'challanger_id' => Auth::id(),
                'receiver_id' => $request->id,
                'status' => false,
                'code' => Str::lower(Str::random(6)),
            ]);
            broadcast(new ChallangeRequest($request->id));
            logger()->info($challangeData);

            $user = User::where('id',$request->id)->get();
            return response()->json([
                'message' => 'Challenge broadcasted to '.$user[0]->username,
                'username'=>$user[0]->username,
                'name'=>$user[0]->fname.' '. $user[0]->lname,
                'id'=>$user[0]->id,
                'country'=>$user[0]->country,
                'email'=>$user[0]->email,
                'code'=> $challangeData->code
            ]);  
        }else{
            return response()->json([
                'game' => $challanges[0],
                'message' => 'onPlay'
            ]);
        }

    }

    public function activeChallanges(){
        $incoming_challange = Challange::where('status',0)
                                ->where('receiver_id',Auth::id())
                                ->get()
                                ->map(function ($data){
                                    return [
                                        'status' => $data->status,
                                        'id' => $data->id,
                                        'code' => $data->code,
                                        'challanger_id' => $data->challanger_id,
                                        'challanger_username' => User::where('id',$data->challanger_id)->get()[0]->username,
                                        'receiver_id' => $data->receiver_id,
                                        'receiver_username' => User::where('id',$data->receiver_id)->get()[0]->username,
                                    ];
                                });
        $outgoing_challange = Challange::where('status',0)
                                ->where('challanger_id',Auth::id())
                                ->get()
                                ->map(function ($data){
                                    return [
                                        'status' => $data->status,
                                        'id' => $data->id,
                                        'code' => $data->code,
                                        'challanger_id' => $data->challanger_id,
                                        'challanger_username' => User::where('id',$data->challanger_id)->get()[0]->username,
                                        'receiver_id' => $data->receiver_id,
                                        'receiver_username' => User::where('id',$data->receiver_id)->get()[0]->username,
                                ];
                                });
        return response()->json([
            'incoming_challange' => $incoming_challange,
            'outgoing_challange' => $outgoing_challange,
        ]);
    }

    public function challengeAccept($code){
        $isAccepted = Challange::where('code',$code)->update(['status'=>true]);
        logger()->info('this shows the challange was accepted ');
        logger()->info(Challange::where('code',$code)->get());
        logger()->info($isAccepted);
        broadcast(new ChallangeAccept($code,request('user')));
    }

    public function cancelChallenge($code){
        $challange = Challange::where('code',$code)->delete();
        $game = Play::where('code',$code)
                        ->where('isDone',0)
                        ->update(['isDone' => 1]);
        // broadcast(new ChallangeDeleted());
        return response()->json([
            'message'=>'Success'
        ]);
    }
}
