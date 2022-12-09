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
        Schema::table('users', function (Blueprint $table) {
            $table->string('img_url')->default(env('USER_PUBLIC_AVATAR_URL','/img/avatar/default.png'));
            $table->string('number')->default('');
            $table->text('bio')->nullable();
            $table->timestamp('calendar')->nullable();
            $table->integer('seat')->default(0);
            $table->integer('account')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
