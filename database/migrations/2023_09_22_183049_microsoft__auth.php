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
        Schema::create('microsoft__auth', function (Blueprint $table) {
            $table->id();
            $table->string('userId');
            $table->string('uuid')->nullable()->default(NULL);
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('microsoft__auth');
    }
};
