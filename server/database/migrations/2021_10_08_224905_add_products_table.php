<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->foreignId('category_id');
        $table->foreignId('unit_id');
        $table->foreignId('branch_id');
        $table->mediumText('product_code');
        $table->mediumText('product_serial')->nullable();
        $table->mediumText('product_name');
        $table->mediumText('product_qty');
        $table->mediumText('product_price');
        $table->longText('product_notes')->nullable();
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
        Schema::dropIfExists('products');
    }
}
