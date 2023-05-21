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
        Schema::create('promocode', function (Blueprint $table) {
            $table->id();
            $table->string('code')->nullable(false);
            $table->string('type')->nullable(false);
            $table->integer('max_use')->nullable(true);
            $table->integer('max_use_per_user')->nullable(true);
            $table->timestamp('expire_date')->nullable(false);
            $table->double('give_amount')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promocode');
    }
};
