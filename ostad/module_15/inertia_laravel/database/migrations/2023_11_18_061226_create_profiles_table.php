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
        Schema::create('profiles', function (Blueprint $table) {
            $table -> id();
            
            $table -> unsignedBigInteger('user_id') -> unique();
            $table -> string('designation', 50);
            $table -> string('description', 2000);
            $table -> string('guideline', 1000)->nullable();
            $table -> string('image', 1000);
  
            $table->string('facebook', 500)->nullable();
            $table->string('github', 500)->nullable();  
            $table->string('linkedin', 500)->nullable();
            $table->string('leetcode', 500)->nullable();

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
        Schema::dropIfExists('profiles');
    }
};
