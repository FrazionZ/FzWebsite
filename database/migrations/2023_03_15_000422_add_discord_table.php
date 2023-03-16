<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
    {
        Schema::create('social__discord', function (Blueprint $table) {
            $table->id();
            $table->string('did')->nullable()->default(NULL);
            $table->integer('uid');
            $table->string('atoken');
            $table->string('rtoken');
            $table->timestamps();
        });
    }
    
    
    public function down()
    {
        Schema::dropIfExists('social__discord');
    }
};
