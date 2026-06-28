<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'fee',
        'details',
        'semester',
        'school_year',
        'is_archived',
    ];

    protected function casts(): array
    {
        return [
            'fee' => 'decimal:2',
            'details' => 'array',
            'is_archived' => 'boolean',
        ];
    }

    public function transactions()
    {
        return $this->hasMany(TransactionItem::class);
    }
}
