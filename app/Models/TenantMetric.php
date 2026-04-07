<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantMetric extends Model
{
    protected $fillable = [
        'tenant_id',
        'month',
        'api_requests_count',
        'bandwidth_used',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
