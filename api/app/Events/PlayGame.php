<?php

namespace App\Events;

use App\Models\Play;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PlayGame implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $board; // The board data to be broadcasted
    public $color;
    public $game;
    /**
     * Create a new event instance.
     *
     * @param Play $playGame
     */
    public function __construct( $playGame,$color,$game)
    {
        $this->board = $playGame; // Assuming $playGame contains the game board data
        $this->color = $color;
        $this->game = $game;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('playGame'), // Public channel for broadcasting
        ];
    }

    /**
     * The data that should be broadcast.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'board' => $this->board, // Broadcasting the board data
            'color' => $this->color,
            'game' => $this->game,
            // 'color' => ($this->color === 'white') ? 'black' : $this->color,
        ];
    }
}
