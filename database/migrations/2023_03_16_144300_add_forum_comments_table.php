<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
     
    public function up()
    {
        Schema::create('forum__comments', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('th_id')->nullable();
            $table->integer('user_id')->nullable(); //Author of comments
            $table->text('content')->nullable(false);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('forum__comments');
    }
};
