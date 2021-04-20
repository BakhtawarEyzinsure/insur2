<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoryQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_question', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('question_id')->index();
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');

            $table->unsignedBigInteger('category_id')->index();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');

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
        Schema::dropIfExists('question_category');
    }
}
