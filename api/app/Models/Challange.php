<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Challange extends Model
{
    protected $fillable = [
        'challanger_id',
        'receiver_id',
        'status',
        'code',
    ];
}
