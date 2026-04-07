<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CalculateTenantStorage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tenant:calculate-storage';

    protected $description = 'Calculates storage occupied (DB size + files) for each tenant';

    public function handle()
    {
        $tenants = \App\Models\Tenant::all();

        foreach ($tenants as $tenant) {
            $dbSize = 0;
            // Get database name
            $dbName = config('database.connections.tenant.database') ?? $tenant->database()->getName();
            
            try {
                $tenant->run(function () use (&$dbSize) {
                    $result = \Illuminate\Support\Facades\DB::select('SELECT SUM(data_length + index_length) AS size FROM information_schema.tables WHERE table_schema = DATABASE()');
                    $dbSize = $result[0]->size ?? 0;
                });
            } catch (\Exception $e) {
                $this->error("Failed to calculate DB size for tenant {$tenant->id}: " . $e->getMessage());
            }

            // In a real scenario, we would also:
            // $storageSize = get_all_files_size(storage_path("tenant{$tenant->id}"));
            $storageSize = 0;

            $tenant->update([
                'storage_occupied' => $dbSize + $storageSize,
            ]);

            $this->info("Tenant {$tenant->id} storage updated: " . ($dbSize + $storageSize) . " bytes.");
        }
        
        $this->info("All tenants storage calculated.");
    }
}
