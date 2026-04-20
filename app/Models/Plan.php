<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'type',
        'description',
        'price',
        'status',
        'is_featured',
        'features',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_featured' => 'boolean',
            'features' => 'array',
        ];
    }

    /**
     * Get a specific feature value from the plan.
     */
    public function getFeature(string $key, mixed $default = null): mixed
    {
        return data_get($this->features, $key, $default);
    }
}
