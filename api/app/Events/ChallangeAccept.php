<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChallangeAccept implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $code ;
    public $user ;
    /**
     * Create a new event instance.
     */
    public function __construct($data,$id)
    {
        $this->code = $data;
        $this->user = $id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        logger()->info('challange-accepted.'.$this->user);
        return [
            new Channel('challange-accepted.'.$this->user),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'code'=>  $this->code
        ];
    }
}
