<?php

namespace App\Models;

use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'plan',
            'organization_name',
            'organization_type',
            'name',
            'email',
            'address',
            'status',
            'university',
            'storage_occupied',
        ];
    }

    public function metrics()
    {
        return $this->hasMany(TenantMetric::class);
    }

    /**
     * Get a feature limit from the tenant's assigned plan.
     */
    public function getPlanFeature(string $key, mixed $default = null): mixed
    {
        $plan = null;

        if (isset($this->plan_id)) {
            $plan = Plan::on('mysql')
                ->where('id', $this->plan_id)
                ->where('status', 'active')
                ->first();
        }

        if (! $plan) {
            $plan = Plan::on('mysql')
                ->where('type', $this->plan ?? 'basic')
                ->where('status', 'active')
                ->first();
        }

        if (! $plan) {
            return $default;
        }

        return $plan->getFeature($key, $default);
    }
}
