<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_sessions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('event_id')
                ->constrained('events')
                ->cascadeOnDelete();

            $table->string('name');
            $table->enum('status', ['pending', 'active', 'paused', 'ended'])->default('pending');

            $table->dateTime('started_at')->nullable();
            $table->dateTime('paused_at')->nullable();
            $table->dateTime('ended_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_sessions');
    }
};
