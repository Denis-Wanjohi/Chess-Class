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
        Schema::create('plays', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->unsignedBigInteger('challanger'); // Foreign key for the challenger
            $table->unsignedBigInteger('receiver'); 
            $table->text('color')->default();
            $table->text('board');
            $table->text('captured')->nullable();
            $table->string('results')->nullable();
            $table->boolean('isDone')->default(false); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plays');
    }
};
