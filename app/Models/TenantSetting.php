<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantSetting extends Model
{
    protected $fillable = [
        'key',
        'value',
    ];

    /**
     * Get all settings as an associative array.
     *
     * @return array<string, string|null>
     */
    public static function getSettings(): array
    {
        return static::query()
            ->pluck('value', 'key')
            ->toArray();
    }

    /**
     * Set a single setting by key (upsert).
     */
    public static function setSetting(string $key, ?string $value): static
    {
        return static::updateOrCreate(
            ['key' => $key],
            ['value' => $value],
        );
    }
}
