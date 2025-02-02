<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('challanges', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('challanger_id'); // Foreign key for the challenger
            $table->unsignedBigInteger('receiver_id');  // Foreign key for the receiver
            $table->boolean('status')->default(false); 
            // $table->boolean('isAccepted')->default(false); 
            $table->string('code')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('challanges');
    }
};
