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
        Schema::create('users', function (Blueprint $table) {
            $table -> id();

            $table -> string('name', 20);
            $table -> string('username', 20) -> unique();
            $table -> string('email', 50) -> unique();
            $table -> string('password', 255);
            $table -> string('role', 20);
            $table->enum('status', ['active', 'inactive'])->default('inactive'); // Default to 'inactive'
            $table -> string('otp', 10);
            
            $table -> timestamp('created_at')->useCurrent();
            $table -> timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
