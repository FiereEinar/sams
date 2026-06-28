import Header from '@/components/ui/Header';
import Layout from './Layout';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { useToast } from '@/hooks/use-toast';
import Dialog from '@/components/ui/Dialog';

type Collection = {
  id: number;
  name: string;
  fee: number;
  details: string[];
  semester: string;
  school_year: string;
  created_at: string;
  is_archived: boolean;
};

export default function Collections({ collections }: { collections: Collection[] }) {
  const { props } = usePage();
  const { toast } = useToast();
  const permissions = (props as any).userPermissions || [];
  const canCreate = permissions.includes('COLLECTIONS_CREATE');
  const canDelete = permissions.includes('COLLECTIONS_DELETE');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingCollectionId, setDeletingCollectionId] = useState<number | null>(null);

  const [newCollection, setNewCollection] = useState({
    name: '',
    fee: '',
    details: '',
    semester: '',
    school_year: '',
    is_archived: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Parse details from comma-separated string to array
    const detailsArray = newCollection.details
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    router.post(
      '/collections',
      {
        ...newCollection,
        fee: Number(newCollection.fee),
        details: detailsArray,
      },
      {
        onSuccess: () => {
          setIsCreateModalOpen(false);
          setNewCollection({ name: '', fee: '', details: '', semester: '', school_year: '', is_archived: false });
          toast({ title: 'Success', description: 'Collection created successfully' });
        },
        onFinish: () => setIsSubmitting(false),
      },
    );
  };

  const openEditModal = (collection: Collection) => {
    setEditingCollection(collection);
    setNewCollection({
      name: collection.name,
      fee: collection.fee.toString(),
      details: (collection.details || []).join(', '),
      semester: collection.semester || '',
      school_year: collection.school_year || '',
      is_archived: collection.is_archived || false,
    });
    setIsEditModalOpen(true);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollection) return;
    setIsSubmitting(true);

    const detailsArray = newCollection.details
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    router.put(
      `/collections/${editingCollection.id}`,
      {
        ...newCollection,
        fee: Number(newCollection.fee),
        details: detailsArray,
      },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setEditingCollection(null);
          setNewCollection({ name: '', fee: '', details: '', semester: '', school_year: '', is_archived: false });
          toast({ title: 'Success', description: 'Collection updated successfully' });
        },
        onFinish: () => setIsSubmitting(false),
      },
    );
  };

  const handleToggleArchive = (collection: Collection) => {
    router.put(
      `/collections/${collection.id}`,
      {
        ...collection,
        is_archived: !collection.is_archived,
      },
      {
        onSuccess: () => toast({ title: 'Success', description: `Collection ${collection.is_archived ? 'unarchived' : 'archived'}` }),
      },
    );
  };

  const handleDelete = (id: number) => {
    setDeletingCollectionId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!deletingCollectionId) return;
    router.delete(`/collections/${deletingCollectionId}`, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Collection deleted' });
        setIsDeleteDialogOpen(false);
        setDeletingCollectionId(null);
      },
    });
  };

  return (
    <Layout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Header>Collections</Header>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Manage payment categories and fees for the organization.</p>
        </div>
        {canCreate && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add Collection
          </button>
        )}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-surface-dark">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50/50 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Fee</th>
                <th className="px-6 py-4 font-medium">Details Needed</th>
                <th className="px-6 py-4 font-medium">Semester / Year</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {collections.map((collection) => (
                <tr key={collection.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{collection.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    ₱{Number(collection.fee).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {collection.details && collection.details.length > 0 ? (
                        collection.details.map((detail, idx) => (
                          <span key={idx} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-white/10 dark:text-slate-300">
                            {detail}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {collection.semester === '1' ? '1st Sem' : collection.semester === '2' ? '2nd Sem' : collection.semester || '-'} /{' '}
                    {collection.school_year ? `${collection.school_year}-${Number(collection.school_year) + 1}` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    {collection.is_archived ? (
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-white/10 dark:text-slate-400">
                        Archived
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-500/20 dark:text-green-400">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {canCreate && (
                        <button
                          onClick={() => handleToggleArchive(collection)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          title={collection.is_archived ? 'Unarchive' : 'Archive'}
                        >
                          <span className="material-symbols-outlined text-[20px]">{collection.is_archived ? 'unarchive' : 'archive'}</span>
                        </button>
                      )}
                      {canCreate && (
                        <button
                          onClick={() => openEditModal(collection)}
                          className="text-primary hover:text-primary-hover dark:text-primary/80 dark:hover:text-primary"
                          title="Edit Collection"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(collection.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete Collection"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {collections.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No collections found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 animate-in bg-slate-900/50 backdrop-blur-sm duration-200 fade-in"
            onClick={() => {
              setIsCreateModalOpen(false);
              setIsEditModalOpen(false);
            }}
          />
          <div className="relative w-full max-w-md animate-in rounded-2xl bg-white p-6 shadow-xl duration-200 zoom-in-95 fade-in dark:bg-surface-dark">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{isEditModalOpen ? 'Edit Collection' : 'Create Collection'}</h2>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={isEditModalOpen ? handleEdit : handleCreate} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                <input
                  type="text"
                  required
                  value={newCollection.name}
                  onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                  placeholder="e.g. College T-Shirt"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Fee (₱)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={newCollection.fee}
                  onChange={(e) => setNewCollection({ ...newCollection, fee: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Dynamic Details (Comma separated)</label>
                <input
                  type="text"
                  value={newCollection.details}
                  onChange={(e) => setNewCollection({ ...newCollection, details: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                  placeholder="e.g. T-Shirt Size, Nickname"
                />
                <p className="mt-1 text-xs text-slate-500">These will be requested when recording a transaction.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Semester</label>
                  <select
                    required
                    value={newCollection.semester}
                    onChange={(e) => setNewCollection({ ...newCollection, semester: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                  >
                    <option value="" disabled>
                      Select Semester
                    </option>
                    <option value="1">1st Sem</option>
                    <option value="2">2nd Sem</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">School Year</label>
                  <select
                    required
                    value={newCollection.school_year}
                    onChange={(e) => setNewCollection({ ...newCollection, school_year: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                  >
                    <option value="" disabled>
                      Select School Year
                    </option>
                    {Array.from({ length: 10 }, (_, i) => 2021 + i).map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}-{year + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
                >
                  {isSubmitting ? (isEditModalOpen ? 'Updating...' : 'Creating...') : isEditModalOpen ? 'Update Collection' : 'Create Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Delete Collection"
        description="Are you sure you want to delete this collection? This action cannot be undone. Any existing transactions linked to it will remain, but you won't be able to create new ones for this collection."
        confirmText="Delete"
        onConfirm={confirmDelete}
        variant="danger"
      />
    </Layout>
  );
}
