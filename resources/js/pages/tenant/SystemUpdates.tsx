import Header from '@/components/ui/Header';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Layout from './Layout';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { useUpdate } from '@/hooks/use-update';

type Release = {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  prerelease: boolean;
};

type UpdateStep = {
  step: string;
  status: 'success' | 'error' | 'warning';
  output: string;
};

type PageProps = {
  currentVersion: string;
  commitHash: string;
  installedVersions: string[];
  allowRollback: boolean;
};

export default function SystemUpdates() {
  const { props } = usePage();
  const { currentVersion, commitHash, installedVersions, allowRollback } = props as unknown as PageProps;
  const { setIsUpdating } = useUpdate();

  const [checking, setChecking] = useState(false);
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updateSteps, setUpdateSteps] = useState<UpdateStep[]>([]);
  const [updateResult, setUpdateResult] = useState<{ success: boolean; newVersion: string } | null>(null);
  const [activeVersion, setActiveVersion] = useState(currentVersion);
  const [showRollback, setShowRollback] = useState(false);
  const [expandedRelease, setExpandedRelease] = useState<string | null>(null);

  const checkForUpdates = async () => {
    setChecking(true);
    setCheckError(null);
    setReleases(null);
    setUpdateResult(null);
    setUpdateSteps([]);

    try {
      const response = await axios.post('/system/updates/check');
      if (response.data.success) {
        setReleases(response.data.releases);
      } else {
        setCheckError(response.data.error || 'Failed to check for updates.');
      }
    } catch {
      setCheckError('Network error. Could not reach the server.');
    } finally {
      setChecking(false);
    }
  };

  const applyUpdate = async (version: string) => {
    setUpdating(true);
    setIsUpdating(true);
    setUpdateSteps([]);
    setUpdateResult(null);

    try {
      const response = await axios.post('/system/updates/apply', { version }, { timeout: 600000 });
      setUpdateSteps(response.data.steps);
      setUpdateResult({ success: response.data.success, newVersion: response.data.newVersion });
      if (response.data.success) {
        setActiveVersion(response.data.newVersion);
        setReleases(null);
      }
    } catch {
      setUpdateResult({ success: false, newVersion: activeVersion });
      setUpdateSteps((prev) => [
        ...prev,
        { step: 'Request failed', status: 'error', output: 'The update request timed out or failed.' },
      ]);
    } finally {
      setUpdating(false);
      setIsUpdating(false);
    }
  };

  const rollbackToVersion = async (version: string) => {
    setUpdating(true);
    setIsUpdating(true);
    setUpdateSteps([]);
    setUpdateResult(null);

    try {
      const response = await axios.post('/system/updates/rollback', { version }, { timeout: 600000 });
      setUpdateSteps(response.data.steps);
      setUpdateResult({ success: response.data.success, newVersion: response.data.newVersion });
      if (response.data.success) {
        setActiveVersion(response.data.newVersion);
      }
    } catch {
      setUpdateResult({ success: false, newVersion: activeVersion });
      setUpdateSteps((prev) => [
        ...prev,
        { step: 'Request failed', status: 'error', output: 'The rollback request timed out or failed.' },
      ]);
    } finally {
      setUpdating(false);
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const rollbackVersions = installedVersions.filter((v) => v !== activeVersion);

  return (
    <Layout>
      {/* Full Screen Overlay during update */}
      {updating && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="material-symbols-outlined animate-spin text-6xl text-primary">progress_activity</span>
            <h2 className="text-2xl font-black text-white">System is Updating</h2>
            <p className="max-w-md text-sm text-slate-300">
              Please do not refresh or close this page. The application is running updates and will be briefly unavailable.
            </p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <Header>System Updates</Header>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Manage your system version, check for updates, and rollback if needed.
        </p>
      </div>

      {/* Current Version Card */}
      <section
        id="system-current-version"
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-surface-dark"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <span className="material-symbols-outlined text-2xl text-primary">verified</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Current Version</h2>
              <div className="mt-1 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                  <span className="material-symbols-outlined text-sm">tag</span>
                  {activeVersion === 'unknown' ? 'No version tag' : activeVersion}
                </span>
                <span className="text-xs text-slate-400">
                  commit <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono dark:bg-white/10">{commitHash}</code>
                </span>
              </div>
            </div>
          </div>
          <button
            id="check-updates-btn"
            onClick={checkForUpdates}
            disabled={checking || updating}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-lg ${checking ? 'animate-spin' : ''}`}>
              {checking ? 'progress_activity' : 'refresh'}
            </span>
            {checking ? 'Checking...' : 'Check for Updates'}
          </button>
        </div>
      </section>

      {/* Check Error */}
      {checkError && (
        <section className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-500/20 dark:bg-red-500/10">
            <span className="material-symbols-outlined mt-0.5 text-red-500">error</span>
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-300">Failed to Check for Updates</h3>
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{checkError}</p>
            </div>
          </div>
        </section>
      )}

      {/* Update Progress */}
      {updateSteps.length > 0 && (
        <section className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-surface-dark">
            <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4 dark:border-white/10">
              {updating ? (
                <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
              ) : updateResult?.success ? (
                <span className="material-symbols-outlined text-emerald-500">check_circle</span>
              ) : (
                <span className="material-symbols-outlined text-red-500">error</span>
              )}
              <h3 className="font-semibold text-slate-800 dark:text-white">
                {updating ? 'Update in Progress...' : updateResult?.success ? 'Update Complete!' : 'Update Failed'}
              </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {updateSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 px-6 py-3">
                  {step.status === 'success' ? (
                    <span className="material-symbols-outlined mt-0.5 text-lg text-emerald-500">check_circle</span>
                  ) : step.status === 'warning' ? (
                    <span className="material-symbols-outlined mt-0.5 text-lg text-amber-500">warning</span>
                  ) : (
                    <span className="material-symbols-outlined mt-0.5 text-lg text-red-500">cancel</span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{step.step}</p>
                    {step.output && (
                      <pre className="mt-1 max-h-24 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-2 font-mono text-xs text-slate-500 dark:bg-white/5 dark:text-slate-400">
                        {step.output}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
              {updating && (
                <div className="flex items-center gap-3 px-6 py-3">
                  <span className="material-symbols-outlined animate-spin text-lg text-primary">progress_activity</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Processing next step...</p>
                </div>
              )}
            </div>
            {updateResult && (
              <div
                className={`border-t px-6 py-4 ${
                  updateResult.success
                    ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10'
                    : 'border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10'
                }`}
              >
                <p className={`text-sm font-medium ${updateResult.success ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                  {updateResult.success
                    ? `Successfully updated to ${updateResult.newVersion}. You may need to refresh the page.`
                    : 'The update could not complete. The system has been brought back online. Please check the logs above for details.'}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Available Updates */}
      {releases !== null && !updating && updateSteps.length === 0 && (
        <section className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {releases.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white py-12 dark:border-white/10 dark:bg-surface-dark">
              <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                <span className="material-symbols-outlined text-3xl text-emerald-500">check_circle</span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">You're Up to Date!</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Your system is running the latest available version.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500">new_releases</span>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {releases.length} Update{releases.length !== 1 ? 's' : ''} Available
                </h3>
              </div>
              {releases.map((release) => (
                <div
                  key={release.tag_name}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-surface-dark"
                >
                  <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/10">
                        <span className="material-symbols-outlined text-xl text-amber-600 dark:text-amber-400">upgrade</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800 dark:text-white">{release.name}</h4>
                          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                            {release.tag_name}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          Released {formatDate(release.published_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {release.body && (
                        <button
                          onClick={() => setExpandedRelease(expandedRelease === release.tag_name ? null : release.tag_name)}
                          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
                        >
                          <span className="material-symbols-outlined text-lg">
                            {expandedRelease === release.tag_name ? 'expand_less' : 'expand_more'}
                          </span>
                          Changelog
                        </button>
                      )}
                      <ConfirmDialog
                        title={`Update to ${release.tag_name}`}
                        description={`This will update your system from ${activeVersion} to ${release.tag_name}. The application will be briefly unavailable during the update. This process includes running migrations and rebuilding assets.`}
                        confirmText="Start Update"
                        icon="system_update_alt"
                        iconClass="text-primary bg-primary/10"
                        confirmStyle="bg-primary hover:bg-primary-hover shadow-primary/20"
                        onConfirm={(close) => {
                          close();
                          applyUpdate(release.tag_name);
                        }}
                        trigger={(open) => (
                          <button
                            onClick={open}
                            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-xl"
                          >
                            <span className="material-symbols-outlined text-lg">download</span>
                            Update
                          </button>
                        )}
                      />
                    </div>
                  </div>
                  {/* Changelog Expandable */}
                  {expandedRelease === release.tag_name && release.body && (
                    <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/[0.02]">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-slate-600 dark:text-slate-300">
                        {release.body}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Rollback Section */}
      {!updating && allowRollback && (
        <section className="mt-8">
          <button
            onClick={() => setShowRollback(!showRollback)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4 text-left transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:hover:bg-white/[0.03]"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">history</span>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">Version History & Rollback</h3>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  View installed versions and rollback to a previous release
                </p>
              </div>
            </div>
            <span className={`material-symbols-outlined text-slate-400 transition-transform ${showRollback ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>

          {showRollback && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
              {rollbackVersions.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center dark:border-white/10 dark:bg-surface-dark">
                  <span className="material-symbols-outlined mb-2 text-3xl text-slate-300 dark:text-slate-600">
                    inventory_2
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No other versions available for rollback.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {rollbackVersions.map((version) => (
                    <div
                      key={version}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-3 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:hover:bg-white/[0.03]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-sm text-slate-400">tag</span>
                        <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {version}
                        </span>
                      </div>
                      <ConfirmDialog
                        title={`Rollback to ${version}`}
                        description={`This will rollback your system from ${activeVersion} to ${version}. The application will be briefly unavailable during the process. Database migrations will be run, but destructive migration rollbacks are NOT performed — only forward migrations.`}
                        confirmText="Rollback"
                        icon="history"
                        iconClass="text-amber-500 bg-amber-500/10"
                        confirmStyle="bg-amber-500 hover:bg-amber-600 shadow-amber-500/20"
                        onConfirm={(close) => {
                          close();
                          rollbackToVersion(version);
                        }}
                        trigger={(open) => (
                          <button
                            onClick={open}
                            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10"
                          >
                            <span className="material-symbols-outlined text-base">undo</span>
                            Rollback
                          </button>
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </Layout>
  );
}
