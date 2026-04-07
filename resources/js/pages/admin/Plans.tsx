import Layout from './Layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Plan } from '@/types/index';
import Dialog from '@/components/ui/Dialog';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

function CreatePlanForm({ close }: { close: () => void }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'basic',
        description: '',
        price: '0',
        is_featured: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/plans', {
            onSuccess: close,
        });
    };

    return (
        <div className="modal-glow flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-surface-light shadow-2xl dark:border-white/5 dark:bg-surface-dark">
            <header className="flex items-center justify-between border-b border-slate-200 px-8 py-6 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                        <span className="material-symbols-outlined text-primary">sell</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-slate-800 dark:text-white">Create New Plan</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Configure new subscription tier details.</p>
                    </div>
                </div>
                <button onClick={close} className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </header>
            <div className="max-h-[80vh] overflow-y-auto p-8">
                <form id="create-plan-form" onSubmit={submit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Plan Name</label>
                            <input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                                placeholder="e.g. Org Pro Christmas Promo"
                                type="text"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                                placeholder="Brief summary of the plan's purpose..."
                                rows={4}
                            ></textarea>
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Tier Type</label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value as 'basic' | 'premium')}
                                    className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white"
                                >
                                    <option className="bg-surface-dark" value="basic">Basic</option>
                                    <option className="bg-surface-dark" value="premium">Premium</option>
                                </select>
                                {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Price (₱/sem)</label>
                                <input
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                            </div>
                        </div>
                        <div className="space-y-2 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="rounded border-slate-300 bg-slate-50 text-primary transition-all focus:ring-primary dark:border-white/10 dark:bg-background-dark"
                                />
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Highlight as "Most Selected"</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <footer className="flex items-center justify-end gap-4 border-t border-slate-200 bg-slate-50 px-8 py-6 dark:border-white/5 dark:bg-background-dark">
                <button
                    onClick={close}
                    className="rounded-lg px-6 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-white/5"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    form="create-plan-form"
                    disabled={processing}
                    className="flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Create Plan
                </button>
            </footer>
        </div>
    );
}

function EditPlanForm({ plan, close }: { plan: Plan; close: () => void }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: plan.name,
        type: plan.type,
        description: plan.description || '',
        price: plan.price.toString(),
        is_featured: plan.is_featured,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/plans/${plan.id}`, {
            onSuccess: close,
        });
    };

    return (
        <div className="modal-glow flex w-full max-w-4xl min-w-[30rem] flex-col overflow-hidden rounded-xl border border-slate-200 bg-surface-light shadow-2xl dark:border-white/5 dark:bg-surface-dark md:min-w-[40rem]">
            <header className="flex items-center justify-between border-b border-slate-200 px-8 py-6 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                        <span className="material-symbols-outlined text-primary">edit</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-slate-800 dark:text-white">Edit Plan</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Modify existing subscription tier details.</p>
                    </div>
                </div>
                <button onClick={close} className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </header>
            <div className="max-h-[80vh] overflow-y-auto p-8">
                <form id="edit-plan-form" onSubmit={submit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Plan Name</label>
                            <input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                                placeholder="e.g. Org Pro Christmas Promo"
                                type="text"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                                placeholder="Brief summary of the plan's purpose..."
                                rows={4}
                            ></textarea>
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Tier Type</label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value as 'basic' | 'premium')}
                                    className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white"
                                >
                                    <option className="bg-surface-dark" value="basic">Basic</option>
                                    <option className="bg-surface-dark" value="premium">Premium</option>
                                </select>
                                {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Price (₱/sem)</label>
                                <input
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                            </div>
                        </div>
                        <div className="space-y-2 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="rounded border-slate-300 bg-slate-50 text-primary transition-all focus:ring-primary dark:border-white/10 dark:bg-background-dark"
                                />
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Highlight as "Most Selected"</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <footer className="flex items-center justify-end gap-4 border-t border-slate-200 bg-slate-50 px-8 py-6 dark:border-white/5 dark:bg-background-dark">
                <button
                    onClick={close}
                    className="rounded-lg px-6 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-white/5"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    form="edit-plan-form"
                    disabled={processing}
                    className="flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                    <span className="material-symbols-outlined text-[20px]">save</span>
                    Save Changes
                </button>
            </footer>
        </div>
    );
}

export default function Plans({ plans }: { plans: Plan[] }) {
    const toggleStatus = (plan: Plan) => {
        router.post(`/admin/plans/${plan.id}/toggle-status`);
    };

    return (
        <Layout>
            <Head title="Plans" />
            <div>
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Plan Management</h1>
                        <p className="mt-1 text-slate-400">Manage all system plans, pricing, and availability.</p>
                    </div>

                    <Dialog
                        trigger={(open) => (
                            <button
                                onClick={open}
                                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
                            >
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                <span>Create New Plan</span>
                            </button>
                        )}
                    >
                        {(close) => (
                            <div className="flex items-center justify-center p-4">
                                <CreatePlanForm close={close} />
                            </div>
                        )}
                    </Dialog>
                </div>

                {plans.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-surface-dark/50 py-20 text-center">
                        <span className="material-symbols-outlined mb-4 text-6xl text-slate-600">sell</span>
                        <h2 className="text-xl font-bold text-slate-400">No Plans Configured</h2>
                        <p className="mt-1 text-sm text-slate-500">There are no subscription plans configured currently.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-white/5 bg-surface-dark/50">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="border-b border-white/5 bg-white/5 text-xs uppercase text-slate-300">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-nowrap">Plan Details</th>
                                    <th className="px-6 py-4 font-bold">Tier / Type</th>
                                    <th className="px-6 py-4 font-bold">Price / Sem</th>
                                    <th className="px-6 py-4 font-bold text-center">Status</th>
                                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {plans.map((plan) => (
                                    <tr key={plan.id} className="transition-colors hover:bg-white/5 group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-white text-base">{plan.name}</h3>
                                                {plan.is_featured && (
                                                    <span className="rounded-lg bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <p className="max-w-[15rem] truncate text-xs text-slate-500 mt-1">{plan.description}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-lg px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                                                    plan.type === 'premium' ? 'bg-primary/10 text-primary' : 'bg-slate-700/50 text-slate-400'
                                                }`}
                                            >
                                                {plan.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">
                                            ₱{plan.price}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                                    plan.status === 'active'
                                                        ? 'bg-emerald-500/10 text-emerald-400'
                                                        : 'bg-slate-700/50 text-slate-500'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-[14px]">
                                                    {plan.status === 'active' ? 'check_circle' : 'archive'}
                                                </span>
                                                {plan.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity">
                                                <Dialog
                                                    trigger={(open) => (
                                                        <button
                                                            onClick={open}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500/10 text-slate-400 transition-colors hover:bg-primary/10 hover:text-primary"
                                                            title="Edit Plan"
                                                        >
                                                            <span className="material-symbols-outlined text-[16px]">edit</span>
                                                        </button>
                                                    )}
                                                >
                                                    {(close) => (
                                                        <div className="flex items-center justify-center p-4">
                                                            <EditPlanForm plan={plan} close={close} />
                                                        </div>
                                                    )}
                                                </Dialog>
                                                <ConfirmDialog
                                                    title={plan.status === 'active' ? 'Archive Plan' : 'Unarchive Plan'}
                                                    description={`Are you sure you want to ${plan.status === 'active' ? 'archive' : 'unarchive'} this plan?`}
                                                    icon={plan.status === 'active' ? 'archive' : 'unarchive'}
                                                    iconClass={plan.status === 'active' ? 'text-orange-500 bg-orange-500/10' : 'text-emerald-500 bg-emerald-500/10'}
                                                    confirmStyle={plan.status === 'active' ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'}
                                                    confirmText="Confirm"
                                                    onConfirm={() => toggleStatus(plan)}
                                                    trigger={(open) => (
                                                        <button
                                                            onClick={open}
                                                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
                                                                plan.status === 'active'
                                                                    ? 'bg-slate-500/10 text-slate-400 hover:bg-orange-500/10 hover:text-orange-400'
                                                                    : 'bg-slate-500/10 text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400'
                                                            }`}
                                                            title={plan.status === 'active' ? 'Archive Plan' : 'Unarchive Plan'}
                                                        >
                                                            <span className="material-symbols-outlined text-[16px]">
                                                                {plan.status === 'active' ? 'archive' : 'unarchive'}
                                                            </span>
                                                        </button>
                                                    )}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
}
