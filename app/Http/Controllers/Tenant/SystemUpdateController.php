<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\GlobalSetting;
use App\Services\SystemUpdateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SystemUpdateController extends Controller
{
    public function __construct(public SystemUpdateService $updateService) {}

    public function index(): Response
    {
        $currentVersion = $this->updateService->getCurrentVersion();
        $commitHash = $this->updateService->getCurrentCommitHash();
        $installedVersions = $this->updateService->getInstalledVersions();
        $allowRollback = GlobalSetting::on('mysql')->where('key', 'allow_tenant_rollbacks')->value('value') !== 'false';

        return Inertia::render('tenant/SystemUpdates', [
            'currentVersion' => $currentVersion,
            'commitHash' => $commitHash,
            'installedVersions' => $installedVersions,
            'allowRollback' => $allowRollback,
        ]);
    }

    public function check(): JsonResponse
    {
        $currentVersion = $this->updateService->getCurrentVersion();
        $result = $this->updateService->getAvailableReleases();

        if ($result['error']) {
            return response()->json([
                'success' => false,
                'error' => $result['error'],
                'currentVersion' => $currentVersion,
                'releases' => [],
            ]);
        }

        $tenantId = tenant('id');

        // Filter releases newer than the current version
        $availableReleases = collect($result['releases'])
            ->filter(function (array $release) use ($tenantId): bool {
                $tagName = $release['tag_name'];

                if (str_contains($tagName, '-tenant-')) {
                    $parts = explode('-tenant-', $tagName);
                    $targetTenant = end($parts);

                    return $targetTenant === $tenantId;
                }

                return true;
            })
            ->filter(function (array $release) use ($currentVersion): bool {
                if ($currentVersion === 'unknown') {
                    return true;
                }

                return version_compare(
                    ltrim($release['tag_name'], 'v'),
                    ltrim($currentVersion, 'v'),
                    '>'
                );
            })
            ->values()
            ->all();

        return response()->json([
            'success' => true,
            'currentVersion' => $currentVersion,
            'releases' => $availableReleases,
        ]);
    }

    public function apply(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'version' => ['required', 'string', 'regex:/^v?\d+\.\d+\.\d+(?:-[a-zA-Z0-9\-\.]+)?$/'],
        ]);

        $targetVersion = $validated['version'];

        $result = $this->updateService->applyUpdate($targetVersion);

        return response()->json([
            'success' => $result['success'],
            'steps' => $result['steps'],
            'newVersion' => $result['success'] ? $targetVersion : $this->updateService->getCurrentVersion(),
        ]);
    }

    public function rollback(Request $request): JsonResponse
    {
        $allowRollback = GlobalSetting::on('mysql')->where('key', 'allow_tenant_rollbacks')->value('value') !== 'false';

        if (! $allowRollback) {
            abort(403, 'Rollbacks are currently disabled by the central administrator.');
        }

        $validated = $request->validate([
            'version' => ['required', 'string', 'regex:/^v?\d+\.\d+\.\d+(?:-[a-zA-Z0-9\-\.]+)?$/'],
        ]);

        $targetVersion = $validated['version'];

        $result = $this->updateService->rollback($targetVersion);

        return response()->json([
            'success' => $result['success'],
            'steps' => $result['steps'],
            'newVersion' => $result['success'] ? $targetVersion : $this->updateService->getCurrentVersion(),
        ]);
    }
}
