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
        Schema::create('tenant_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('tenant_id');
            $table->string('month'); // YYYY-MM
            $table->unsignedBigInteger('api_requests_count')->default(0);
            $table->unsignedBigInteger('bandwidth_used')->default(0);
            $table->timestamps();

            $table->unique(['tenant_id', 'month']);
            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
        });

        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn(['api_requests_count', 'bandwidth_used']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->unsignedBigInteger('api_requests_count')->default(0);
            $table->unsignedBigInteger('bandwidth_used')->default(0);
        });

        Schema::dropIfExists('tenant_metrics');
    }
};
