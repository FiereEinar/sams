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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('tenant_id');
            $table->string('payer_name');
            $table->string('payer_email');
            $table->integer('amount'); // in centavos
            $table->string('currency')->default('PHP');
            $table->string('description')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('checkout_ref')->nullable();
            $table->enum('status', ['paid', 'pending', 'failed'])->default('paid');
            $table->timestamps();

            $table->foreign('tenant_id')->references('id')->on('tenants')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
