import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Layout from './Layout';

type Role = {
  id: number;
  name: string;
  permissions: string[];
  is_default: boolean;
  users_count: number;
};

type PermissionsGrouped = Record<string, string[]>;

type RolesPageProps = {
  roles: Role[];
  permissionsGrouped: PermissionsGrouped;
};

export default function Roles({ roles, permissionsGrouped }: RolesPageProps) {
  const { props } = usePage();
  const userPermissions: string[] = (props as any).userPermissions || [];

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const canCreate = userPermissions.includes('ROLES_CREATE');
  const canUpdate = userPermissions.includes('ROLES_UPDATE');
  const canDelete = userPermissions.includes('ROLES_DELETE');

  return (
    <Layout>
      <Head title="Roles" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Roles</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Define roles and assign granular permissions.</p>
          </div>
          {canCreate && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Create Role
            </button>
          )}
        </div>

        {/* Roles Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-white/10 dark:bg-surface-dark"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{role.name}</h3>
                    {role.is_default && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">Default</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {role.users_count} {role.users_count === 1 ? 'user' : 'users'}
                  </p>
                </div>
                {!role.is_default && (
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    {canUpdate && (
                      <button
                        onClick={() => setEditingRole(role)}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white"
                        title="Edit role"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => {
                          if (role.users_count > 0) {
                            alert('Cannot delete a role with assigned users. Reassign users first.');
                            return;
                          }
                          if (confirm(`Delete role "${role.name}"?`)) {
                            router.delete(`/roles/${role.id}`);
                          }
                        }}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                        title="Delete role"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Permission summary */}
              <div className="space-y-2">
                {Object.entries(permissionsGrouped).map(([module, perms]) => {
                  const granted = perms.filter((p) => role.permissions.includes(p));
                  if (granted.length === 0) return null;
                  return (
                    <div key={module} className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{module}</span>
                      <span className="text-xs font-bold text-primary">
                        {granted.length}/{perms.length}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-slate-100 pt-3 dark:border-white/5">
                <p className="text-xs font-medium text-slate-400">
                  {role.permissions.length} total permissions
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <RoleFormModal permissionsGrouped={permissionsGrouped} onClose={() => setShowCreateModal(false)} />
      )}

      {/* Edit Modal */}
      {editingRole && (
        <RoleFormModal role={editingRole} permissionsGrouped={permissionsGrouped} onClose={() => setEditingRole(null)} />
      )}
    </Layout>
  );
}

type RoleFormModalProps = {
  role?: Role;
  permissionsGrouped: PermissionsGrouped;
  onClose: () => void;
};

function RoleFormModal({ role, permissionsGrouped, onClose }: RoleFormModalProps) {
  const isEditing = !!role;
  const form = useForm({
    name: role?.name || '',
    permissions: role?.permissions || [],
  });

  const togglePermission = (perm: string) => {
    const current = form.data.permissions;
    if (current.includes(perm)) {
      form.setData(
        'permissions',
        current.filter((p) => p !== perm),
      );
    } else {
      form.setData('permissions', [...current, perm]);
    }
  };

  const toggleModule = (perms: string[]) => {
    const allSelected = perms.every((p) => form.data.permissions.includes(p));
    if (allSelected) {
      form.setData(
        'permissions',
        form.data.permissions.filter((p) => !perms.includes(p)),
      );
    } else {
      const merged = [...new Set([...form.data.permissions, ...perms])];
      form.setData('permissions', merged);
    }
  };

  const selectAll = () => {
    const allPerms = Object.values(permissionsGrouped).flat();
    form.setData('permissions', allPerms);
  };

  const deselectAll = () => {
    form.setData('permissions', []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      form.put(`/roles/${role!.id}`, { onSuccess: onClose });
    } else {
      form.post('/roles', { onSuccess: onClose });
    }
  };

  const formatPermissionLabel = (perm: string): string => {
    const parts = perm.split('_');
    const action = parts[parts.length - 1];
    return action.charAt(0) + action.slice(1).toLowerCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-surface-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
          {isEditing ? 'Edit Role' : 'Create Role'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Role Name</label>
            <input
              type="text"
              value={form.data.name}
              onChange={(e) => form.setData('name', e.target.value)}
              placeholder="e.g. Editor, Viewer, Moderator"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
            />
            {form.errors.name && <p className="mt-1 text-xs text-red-500">{form.errors.name}</p>}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Permissions</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs font-bold text-primary hover:text-primary-hover"
                >
                  Select All
                </button>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <button
                  type="button"
                  onClick={deselectAll}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Deselect All
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(permissionsGrouped).map(([module, perms]) => {
                const allSelected = perms.every((p) => form.data.permissions.includes(p));
                const someSelected = perms.some((p) => form.data.permissions.includes(p));

                return (
                  <div key={module} className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
                    <label className="mb-3 flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = someSelected && !allSelected;
                        }}
                        onChange={() => toggleModule(perms)}
                        className="size-4 rounded border-slate-300 text-primary focus:ring-primary/50 dark:border-white/20 dark:bg-background-dark"
                      />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{module}</span>
                      <span className="ml-auto text-xs text-slate-400">
                        {perms.filter((p) => form.data.permissions.includes(p)).length}/{perms.length}
                      </span>
                    </label>
                    <div className="ml-7 grid grid-cols-2 gap-2">
                      {perms.map((perm) => (
                        <label key={perm} className="flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            checked={form.data.permissions.includes(perm)}
                            onChange={() => togglePermission(perm)}
                            className="size-3.5 rounded border-slate-300 text-primary focus:ring-primary/50 dark:border-white/20 dark:bg-background-dark"
                          />
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                            {formatPermissionLabel(perm)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {form.errors.permissions && <p className="mt-1 text-xs text-red-500">{form.errors.permissions}</p>}
          </div>

          {(form.errors as any).role && (
            <p className="text-sm font-medium text-red-500">{(form.errors as any).role}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={form.processing}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover disabled:opacity-50"
            >
              {isEditing ? 'Save Changes' : 'Create Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
