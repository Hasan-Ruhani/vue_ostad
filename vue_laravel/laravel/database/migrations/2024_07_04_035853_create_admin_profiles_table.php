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
        Schema::create('admin_profiles', function (Blueprint $table) {
            $table -> id();

            $table -> unsignedBigInteger('user_id') -> unique();
            $table -> string('image', 1000);

            $table->foreign('user_id')->references('id')->on('users') 
            -> cascadeOnDelete() -> cascadeOnUpdate();
  
            $table -> timestamp('created_at')->useCurrent();
            $table -> timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_profiles');
    }
};
