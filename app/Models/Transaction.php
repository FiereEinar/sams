<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'collection_id',
        'details',
        'description',
        'paid_amount',
        'status',
        'date',
        'semester',
        'school_year',
        'recorded_by_id',
        'governor',
        'vice_governor',
        'treasurer',
        'auditor',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
            'details' => 'array',
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }

    public function payments()
    {
        return $this->hasMany(TransactionPayment::class);
    }

    public function recordedBy()
    {
        return $this->belongsTo(User::class, 'recorded_by_id');
    }
}
