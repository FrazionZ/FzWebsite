<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('forum__subcategories', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->integer('position')->nullable()->default(0);
            $table->integer('parent_id')->nullable();
            $table->timestamps();
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('forum__subcategories');
    }

};
