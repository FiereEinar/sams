<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Add is_archived to collections
        Schema::table('collections', function (Blueprint $table) {
            $table->boolean('is_archived')->default(false)->after('school_year');
        });

        // 2. Drop transaction_items (it has foreign keys to transactions, so we need to be careful)
        Schema::dropIfExists('transaction_items');

        // Clear existing transactions to prevent foreign key constraint violations
        DB::table('transaction_payments')->delete();
        DB::table('transactions')->delete();

        // 3. Modify transactions table
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('total_amount'); // Dropping total_amount since fee is on collection
            
            // Add new columns
            $table->foreignId('collection_id')->after('student_id')->constrained('collections')->cascadeOnDelete();
            $table->json('details')->nullable()->after('collection_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign(['collection_id']);
            $table->dropColumn(['collection_id', 'details']);
            $table->decimal('total_amount', 10, 2)->default(0)->after('description');
        });

        Schema::create('transaction_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained('transactions')->cascadeOnDelete();
            $table->foreignId('collection_id')->constrained('collections')->cascadeOnDelete();
            $table->decimal('amount', 10, 2);
            $table->json('details')->nullable();
            $table->timestamps();
        });

        Schema::table('collections', function (Blueprint $table) {
            $table->dropColumn('is_archived');
        });
    }
};
