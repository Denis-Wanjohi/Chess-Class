<?php

namespace App\Events;

use App\Models\Challange;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class ChallangeRequest implements  ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $user_id;
    /**
     * Create a new event instance.
     */
    public function __construct($user)
    {
        $this->user_id = $user;
        logger()->info('challange-request.' . $this->user_id);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            
            // new PrivateChannel('challange-request.' . $this->user_id),
            new Channel('challange-request.'.$this->user_id),
        ];
    }

    public function broadcastWith():array
    {
        return[
            'player' => User::where('id',$this->user_id)->get()[0],
            'challenger' => Auth::user(),
            'code' => Challange::where('receiver_id',$this->user_id)->latest()->get()[0]
        ];
    }
}
