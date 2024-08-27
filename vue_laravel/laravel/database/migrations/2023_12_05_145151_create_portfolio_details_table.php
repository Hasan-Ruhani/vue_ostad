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
        Schema::create('portfolio_details', function (Blueprint $table) {
            $table -> id();
            $table -> unsignedBigInteger('category_id');

            $table->string('head_line', 50);
            $table->string('description', 1000);
            $table->string('client', 500);
            $table->string('duration', 50);
            $table->string('project_url', 500);
            $table->string('problem', 500)->nullable();
            $table->string('result', 500)->nullable();
            $table->enum('status', ['active', 'inactive'])->default('inactive'); // Default to 'inactive'

  
            $table -> foreign('category_id') -> references('id') -> on('categories')
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
        Schema::dropIfExists('portfolio_details');
    }
};
