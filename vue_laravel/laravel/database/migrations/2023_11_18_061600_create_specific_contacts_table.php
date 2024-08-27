<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('specific_contacts', function (Blueprint $table) {
            $table -> id();

            $table -> unsignedBigInteger('profile_id');
            $table -> string('user_email', 50);
            $table -> string('client_name', 50);
            $table -> string('client_email', 50);
            $table -> string('whatsapp', 50)->nullable();
            $table -> string('skype', 50)->nullable();
            $table -> string('message', 1000);
            
            $table->foreign('profile_id')->references('id')->on('profiles') 
            -> cascadeOnUpdate();
  
            $table -> timestamp('created_at')->useCurrent();
            $table -> timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specific_contacts');
    }
};
