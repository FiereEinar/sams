<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SystemUpdateService
{
    /**
     * Get the current version from the latest git tag.
     */
    public function getCurrentVersion(): string
    {
        $version = trim((string) shell_exec('git describe --tags --abbrev=0 2>&1'));

        if (empty($version) || str_contains($version, 'fatal')) {
            return 'unknown';
        }

        return $version;
    }

    /**
     * Get the current git commit hash (short).
     */
    public function getCurrentCommitHash(): string
    {
        $hash = trim((string) shell_exec('git rev-parse --short HEAD 2>&1'));

        if (empty($hash) || str_contains($hash, 'fatal')) {
            return 'unknown';
        }

        return $hash;
    }

    /**
     * Fetch available releases from the GitHub API.
     *
     * @return array{releases: list<array{tag_name: string, name: string, body: string, published_at: string, prerelease: bool}>, error: string|null}
     */
    public function getAvailableReleases(): array
    {
        $repo = config('updater.github_repo');
        $apiUrl = config('updater.github_api_url');
        $token = config('updater.github_token');

        $url = "{$apiUrl}/repos/{$repo}/releases";

        try {
            $response = $this->makeGitHubRequest($url);

            if ($response->failed()) {
                return [
                    'releases' => [],
                    'error' => "GitHub API returned status {$response->status()}",
                ];
            }

            $releases = collect($response->json())
                ->filter(fn (array $release): bool => ! $release['prerelease'])
                ->map(fn (array $release): array => [
                    'tag_name' => $release['tag_name'],
                    'name' => $release['name'] ?? $release['tag_name'],
                    'body' => $release['body'] ?? '',
                    'published_at' => $release['published_at'],
                    'prerelease' => $release['prerelease'],
                ])
                ->values()
                ->all();

            return ['releases' => $releases, 'error' => null];
        } catch (\Exception $e) {
            Log::error('Failed to fetch GitHub releases', ['error' => $e->getMessage()]);

            return ['releases' => [], 'error' => $e->getMessage()];
        }
    }

    /**
     * Get locally installed version tags for rollback options.
     *
     * @return list<string>
     */
    public function getInstalledVersions(): array
    {
        $output = trim((string) shell_exec('git tag --sort=-v:refname 2>&1'));

        if (empty($output) || str_contains($output, 'fatal')) {
            return [];
        }

        return array_filter(explode("\n", $output));
    }

    /**
     * Apply an update to the specified version tag.
     *
     * @return array{success: bool, steps: list<array{step: string, status: string, output: string}>}
     */
    public function applyUpdate(string $targetVersion): array
    {
        $steps = [];
        $basePath = base_path();

        $commands = [
            ['step' => 'Enabling maintenance mode', 'cmd' => 'php artisan down --retry=60'],
            ['step' => 'Fetching latest tags', 'cmd' => 'git fetch --all --tags'],
            ['step' => 'Stashing local changes', 'cmd' => 'git stash'],
            ['step' => "Checking out version {$targetVersion}", 'cmd' => "git checkout tags/{$targetVersion} -f"],
            ['step' => 'Installing PHP dependencies', 'cmd' => 'composer install --no-dev --optimize-autoloader --no-interaction'],
            ['step' => 'Installing Node dependencies', 'cmd' => 'npm install'],
            ['step' => 'Building frontend assets', 'cmd' => 'npm run build'],
            ['step' => 'Running central database migrations', 'cmd' => 'php artisan migrate --force'],
            ['step' => 'Running tenant database migrations', 'cmd' => 'php artisan tenants:migrate'],
            ['step' => 'Clearing caches', 'cmd' => 'php artisan config:cache && php artisan route:cache && php artisan view:cache'],
            ['step' => 'Disabling maintenance mode', 'cmd' => 'php artisan up'],
        ];

        $success = true;

        foreach ($commands as $command) {
            $result = $this->executeCommand($command['cmd'], $basePath);

            $stepResult = [
                'step' => $command['step'],
                'status' => $result['exit_code'] === 0 ? 'success' : 'error',
                'output' => $result['output'],
            ];

            $steps[] = $stepResult;

            Log::info("Update step: {$command['step']}", $stepResult);

            if ($result['exit_code'] !== 0) {
                $success = false;

                // If something fails, bring the app back up
                $this->executeCommand('php artisan up', $basePath);
                $steps[] = [
                    'step' => 'Emergency: Re-enabling application',
                    'status' => 'warning',
                    'output' => 'Application brought back online after failure.',
                ];

                break;
            }
        }

        return ['success' => $success, 'steps' => $steps];
    }

    /**
     * Rollback to a previous version tag.
     *
     * @return array{success: bool, steps: list<array{step: string, status: string, output: string}>}
     */
    public function rollback(string $targetVersion): array
    {
        // Rollback uses the same flow as update, just targeting an older tag
        return $this->applyUpdate($targetVersion);
    }

    /**
     * Execute a shell command and capture its output.
     *
     * @return array{output: string, exit_code: int}
     */
    private function executeCommand(string $command, string $cwd): array
    {
        $descriptors = [
            0 => ['pipe', 'r'],
            1 => ['pipe', 'w'],
            2 => ['pipe', 'w'],
        ];

        $process = proc_open($command, $descriptors, $pipes, $cwd, null);

        if (! is_resource($process)) {
            return ['output' => 'Failed to start process', 'exit_code' => 1];
        }

        fclose($pipes[0]);

        $stdout = stream_get_contents($pipes[1]);
        $stderr = stream_get_contents($pipes[2]);

        fclose($pipes[1]);
        fclose($pipes[2]);

        $exitCode = proc_close($process);

        $output = trim($stdout.($stderr ? "\n{$stderr}" : ''));

        return ['output' => $output, 'exit_code' => $exitCode];
    }

    /**
     * Make an HTTP request to the GitHub API with SSL fallback.
     *
     * Tries with SSL verification first. If that fails due to a certificate
     * issue (common on Windows), retries without verification.
     */
    private function makeGitHubRequest(string $url): \Illuminate\Http\Client\Response
    {
        $token = config('updater.github_token');

        $buildRequest = fn (bool $verify = true) => Http::withHeaders([
            'Accept' => 'application/vnd.github.v3+json',
            'User-Agent' => 'SAMS-Updater',
        ])
            ->when(! empty($token), fn ($req) => $req->withToken($token))
            ->when(! $verify, fn ($req) => $req->withoutVerifying())
            ->timeout(15);

        try {
            return $buildRequest(true)->get($url);
        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            if (str_contains($e->getMessage(), 'SSL certificate')) {
                Log::warning('GitHub API SSL verification failed, retrying without verification.');

                return $buildRequest(false)->get($url);
            }

            throw $e;
        }
    }
}
