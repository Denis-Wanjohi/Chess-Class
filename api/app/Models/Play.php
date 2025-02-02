<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Play extends Model
{
    //
    protected $fillable = [
        'board',
        'challanger',
        'receiver',
        'isDone',
        'code' ,
        'color',
        'captured',
        'results',
    ];
}
