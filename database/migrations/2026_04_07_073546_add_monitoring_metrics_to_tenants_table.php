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
        Schema::table('tenants', function (Blueprint $table) {
            $table->unsignedBigInteger('storage_occupied')->default(0);
            $table->unsignedBigInteger('bandwidth_used')->default(0);
            $table->unsignedBigInteger('api_requests_count')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn(['storage_occupied', 'bandwidth_used', 'api_requests_count']);
        });
    }
};
