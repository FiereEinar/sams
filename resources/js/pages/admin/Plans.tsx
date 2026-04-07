import Layout from './Layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Plan } from '@/types/index';
import { useState } from 'react';

export default function Plans({ plans }: { plans: Plan[] }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const { data: createData, setData: setCreateData, post: createPost, processing: createProcessing, reset: createReset, errors: createErrors } = useForm({
        name: '',
        type: 'basic',
        description: '',
        price: '0',
        is_featured: false,
    });

    const { data: editData, setData: setEditData, patch: editPatch, processing: editProcessing, reset: editReset, errors: editErrors } = useForm({
        name: '',
        type: 'basic',
        description: '',
        price: '0',
        is_featured: false,
    });

    const openCreateModal = () => {
        createReset();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (plan: Plan) => {
        setSelectedPlan(plan);
        setEditData({
            name: plan.name,
            type: plan.type,
            description: plan.description || '',
            price: plan.price.toString(),
            is_featured: plan.is_featured,
        });
        setIsEditModalOpen(true);
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createPost('/admin/plans', {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createReset();
            },
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPlan) {
            editPatch(`/admin/plans/${selectedPlan.id}`, {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    setSelectedPlan(null);
                },
            });
        }
    };

    const toggleStatus = (plan: Plan) => {
        if (confirm(`Are you sure you want to ${plan.status === 'active' ? 'archive' : 'unarchive'} this plan?`)) {
            router.post(`/admin/plans/${plan.id}/toggle-status`);
        }
    };

    return (
        <Layout>
            <Head title="Admin Plans" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Available Plans</h3>
                                <button
                                    onClick={openCreateModal}
                                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    New Plan
                                </button>
                            </div>

                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50">
                                            <th className="py-4 px-4 font-semibold text-sm text-slate-700 whitespace-nowrap">Plan Details</th>
                                            <th className="py-4 px-4 font-semibold text-sm text-slate-700 whitespace-nowrap">Tier / Type</th>
                                            <th className="py-4 px-4 font-semibold text-sm text-slate-700 whitespace-nowrap">Price / Sem</th>
                                            <th className="py-4 px-4 font-semibold text-sm text-slate-700 whitespace-nowrap">Status</th>
                                            <th className="py-4 px-4 font-semibold text-sm text-slate-700 whitespace-nowrap text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {plans.map((plan) => (
                                            <tr key={plan.id} className="hover:bg-slate-50 transition-colors group">
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-slate-900">{plan.name}</span>
                                                            {plan.is_featured && (
                                                                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-amber-200">
                                                                    Featured
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-sm text-slate-500">{plan.description}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${plan.type === 'premium' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                                                        {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    <span className="font-bold text-slate-800">₱{plan.price}</span>
                                                </td>
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    <div
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                            plan.status === 'active'
                                                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                                                        }`}
                                                    >
                                                        <span
                                                            className="material-symbols-outlined shrink-0"
                                                            style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}
                                                        >
                                                            {plan.status === 'active' ? 'check_circle' : 'archive'}
                                                        </span>
                                                        {plan.status === 'active' ? 'Active' : 'Archived'}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 whitespace-nowrap text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => openEditModal(plan)}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors border border-slate-200 hover:border-primary/30"
                                                            title="Edit Plan"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => toggleStatus(plan)}
                                                            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                                                                plan.status === 'active'
                                                                    ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200'
                                                                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200'
                                                            }`}
                                                            title={plan.status === 'active' ? 'Archive Plan' : 'Unarchive Plan'}
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">
                                                                {plan.status === 'active' ? 'archive' : 'unarchive'}
                                                            </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {plans.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-slate-500">
                                                    No plans found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <h3 className="text-xl font-bold text-slate-800">Create New Plan</h3>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-slate-400 transition-colors hover:text-slate-600"
                            >
                                <span className="material-symbols-outlined leading-none">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700">Plan Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        value={createData.name}
                                        onChange={(e) => setCreateData('name', e.target.value)}
                                    />
                                    {createErrors.name && <p className="mt-1 text-sm text-red-500">{createErrors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700">Description</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        value={createData.description}
                                        onChange={(e) => setCreateData('description', e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">Tier Type</label>
                                        <select
                                            className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                            value={createData.type}
                                            onChange={(e) => setCreateData('type', e.target.value as 'basic' | 'premium')}
                                        >
                                            <option value="basic">Basic</option>
                                            <option value="premium">Premium</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">Price (₱)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            required
                                            className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                            value={createData.price}
                                            onChange={(e) => setCreateData('price', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <input
                                        type="checkbox"
                                        id="create_featured"
                                        className="rounded border-slate-300 text-primary focus:ring-primary"
                                        checked={createData.is_featured}
                                        onChange={(e) => setCreateData('is_featured', e.target.checked)}
                                    />
                                    <label htmlFor="create_featured" className="text-sm font-medium text-slate-700">Highlight as "Most Selected"</label>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createProcessing}
                                    className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-hover disabled:opacity-50"
                                >
                                    Create Plan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && selectedPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <h3 className="text-xl font-bold text-slate-800">Edit Plan</h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-slate-400 transition-colors hover:text-slate-600"
                            >
                                <span className="material-symbols-outlined leading-none">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700">Plan Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        value={editData.name}
                                        onChange={(e) => setEditData('name', e.target.value)}
                                    />
                                    {editErrors.name && <p className="mt-1 text-sm text-red-500">{editErrors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700">Description</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                        value={editData.description}
                                        onChange={(e) => setEditData('description', e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">Tier Type</label>
                                        <select
                                            className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                            value={editData.type}
                                            onChange={(e) => setEditData('type', e.target.value as 'basic' | 'premium')}
                                        >
                                            <option value="basic">Basic</option>
                                            <option value="premium">Premium</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">Price (₱)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            required
                                            className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                                            value={editData.price}
                                            onChange={(e) => setEditData('price', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <input
                                        type="checkbox"
                                        id="edit_featured"
                                        className="rounded border-slate-300 text-primary focus:ring-primary"
                                        checked={editData.is_featured}
                                        onChange={(e) => setEditData('is_featured', e.target.checked)}
                                    />
                                    <label htmlFor="edit_featured" className="text-sm font-medium text-slate-700">Highlight as "Most Selected"</label>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-hover disabled:opacity-50"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
