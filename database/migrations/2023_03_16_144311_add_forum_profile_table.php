<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
     

    public function up()
    {
        Schema::create('forum__profile', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->nullable();
            $table->text('signature')->nullable();
            $table->timestamps();
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('forum__profile');
    }


};
