<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
     

    public function up()
    {
        Schema::create('forum__threads', function(Blueprint $table) {
            $table->increments('id');
            $table->string('title')->nullable();
            $table->integer('sc_id')->nullable();
            $table->integer('user_id')->nullable(); //Author of thread
            $table->integer('locked')->default(0);
            $table->integer('pinned')->default(0);
            $table->integer('public')->default(1);
            $table->text('content')->nullable(false);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->nullable();
            $table->integer('updated_type')->default(-1);
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('forum__threads');
    }


};
