<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
    {
        Schema::create('forum__subcategories_roles', function(Blueprint $table) {
            $table->integer('forum_sc_id')->unsigned()->index();
            $table->foreign('forum_sc_id')->references('id')->on('forum__subcategories')->onDelete('cascade');
            $table->integer('role_id')->unsigned();
            $table->foreign('role_id')->references('id')->on(config('roles.rolesTable'))->onDelete('cascade');
            $table->timestamps();
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('forum__subcategories_roles');
    }

};
