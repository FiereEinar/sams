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
            'bandwidth_used',
            'api_requests_count',
        ];
    }
}
