<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('token_users', function (Blueprint $table) {
            $table->id();
            $table->integer('uid');
            $table->string('token', 191);
            $table->string('os', 255)->nullable();
            $table->string('ip', 255)->nullable();
            $table->string('useragent', 255)->nullable();
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('token_users');
    }
};
