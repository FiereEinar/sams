import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Layout from './Layout';

type Role = {
  id: number;
  name: string;
  permissions: string[];
  is_default: boolean;
  users_count?: number;
};

type User = {
  id: number;
  name: string;
  email: string;
  plan: string;
  roles: Role[];
  created_at: string;
};

type UsersPageProps = {
  users: User[];
  roles: Role[];
  tenantPlan: string;
  userCount: number;
  maxUsers: number | null;
};

export default function Users({ users, roles, tenantPlan, userCount, maxUsers }: UsersPageProps) {
  const { props } = usePage();
  const userPermissions: string[] = (props as any).userPermissions || [];
  const currentUser = (props as any).auth?.user;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const canCreate = userPermissions.includes('USERS_CREATE');
  const canUpdate = userPermissions.includes('USERS_UPDATE');
  const canDelete = userPermissions.includes('USERS_DELETE');
  const limitReached = maxUsers !== null && userCount >= maxUsers;

  return (
    <Layout>
      <Head title="Users" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Users</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage team members and their access.
              {maxUsers !== null && (
                <span className="ml-2 font-medium text-primary">
                  {userCount}/{maxUsers} users
                </span>
              )}
            </p>
          </div>
          {canCreate && (
            <button
              onClick={() => setShowCreateModal(true)}
              disabled={limitReached}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">person_add</span>
              Add User
            </button>
          )}
        </div>

        {limitReached && (
          <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">warning</span>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              User limit reached for {tenantPlan} plan. Upgrade to premium to add more users.
            </p>
          </div>
        )}

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-surface-dark">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 dark:border-white/5 dark:bg-white/5">
                <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  User
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Roles
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Plan
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </th>
                {(canUpdate || canDelete) && (
                  <th className="px-6 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {users.map((user) => {
                const isInactive = user.plan === 'premium' && tenantPlan === 'basic';
                const isSelf = currentUser?.id === user.id;

                return (
                  <tr key={user.id} className={isInactive ? 'opacity-50' : ''}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {user.name}
                            {isSelf && (
                              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                                You
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {user.roles.map((role) => (
                          <span
                            key={role.id}
                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              role.is_default
                                ? 'bg-primary/10 text-primary'
                                : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
                            }`}
                          >
                            {role.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                          user.plan === 'premium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
                        }`}
                      >
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {isInactive ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                          <span className="size-2 rounded-full bg-red-500" />
                          Inactive
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <span className="size-2 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      )}
                    </td>
                    {(canUpdate || canDelete) && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {canUpdate && (
                            <button
                              onClick={() => setEditingUser(user)}
                              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white"
                              title="Edit user"
                            >
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                          )}
                          {canDelete && !isSelf && (
                            <button
                              onClick={() => {
                                if (confirm(`Delete user "${user.name}"?`)) {
                                  router.delete(`/users/${user.id}`);
                                }
                              }}
                              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                              title="Delete user"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && <UserFormModal roles={roles} onClose={() => setShowCreateModal(false)} />}

      {/* Edit Modal */}
      {editingUser && <UserFormModal user={editingUser} roles={roles} onClose={() => setEditingUser(null)} />}
    </Layout>
  );
}

type UserFormModalProps = {
  user?: User;
  roles: Role[];
  onClose: () => void;
};

function UserFormModal({ user, roles, onClose }: UserFormModalProps) {
  const isEditing = !!user;
  const form = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role_ids: user?.roles.map((r) => r.id) || [],
  });

  const toggleRole = (roleId: number) => {
    const current = form.data.role_ids;
    if (current.includes(roleId)) {
      form.setData('role_ids', current.filter((id) => id !== roleId));
    } else {
      form.setData('role_ids', [...current, roleId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      form.put(`/users/${user!.id}`, { onSuccess: onClose });
    } else {
      form.post('/users', { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-surface-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
          {isEditing ? 'Edit User' : 'Add User'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
            <input
              type="text"
              value={form.data.name}
              onChange={(e) => form.setData('name', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
            />
            {form.errors.name && <p className="mt-1 text-xs text-red-500">{form.errors.name}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              value={form.data.email}
              onChange={(e) => form.setData('email', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
            />
            {form.errors.email && <p className="mt-1 text-xs text-red-500">{form.errors.email}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password{isEditing && ' (leave blank to keep current)'}
            </label>
            <input
              type="password"
              value={form.data.password}
              onChange={(e) => form.setData('password', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
              placeholder={isEditing ? '••••••••' : ''}
            />
            {form.errors.password && <p className="mt-1 text-xs text-red-500">{form.errors.password}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Roles</label>
            <div className="space-y-2">
              {roles.map((role) => (
                <label
                  key={role.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                    form.data.role_ids.includes(role.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.data.role_ids.includes(role.id)}
                    onChange={() => toggleRole(role.id)}
                    className="size-4 rounded border-slate-300 text-primary focus:ring-primary/50 dark:border-white/20 dark:bg-background-dark"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{role.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {role.permissions.length} permissions
                    </p>
                  </div>
                  {role.is_default && (
                    <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                      Default
                    </span>
                  )}
                </label>
              ))}
            </div>
            {form.errors.role_ids && <p className="mt-1 text-xs text-red-500">{form.errors.role_ids}</p>}
          </div>

          {form.errors.limit && <p className="text-sm font-medium text-red-500">{(form.errors as any).limit}</p>}

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
              {isEditing ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
