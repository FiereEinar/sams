<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendance_records', function (Blueprint $table) {
            $table->id();

            $table->foreignId('event_session_id')
                ->constrained('event_sessions')
                ->cascadeOnDelete();

            $table->foreignId('student_id')
                ->nullable()
                ->constrained('students')
                ->nullOnDelete();

            $table->string('student_id_input');
            $table->enum('method', ['manual', 'barcode'])->default('manual');
            $table->dateTime('recorded_at');

            $table->unique(['event_session_id', 'student_id_input']);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance_records');
    }
};
