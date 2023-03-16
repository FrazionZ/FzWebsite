<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('social__twitch', function (Blueprint $table) {
            $table->id();
            $table->string('userIdTwitch')->nullable()->default(NULL);
            $table->integer('uid')->nullable()->default(NULL);
            $table->string('access_token')->nullable()->default(NULL);
            $table->string('refresh_token');
            $table->integer('expiresIn')->nullable()->default(NULL);
            $table->timestamps();
        });
    }
    
    
    public function down()
    {
        Schema::dropIfExists('social__twitch');
    }
};
