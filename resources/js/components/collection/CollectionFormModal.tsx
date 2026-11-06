type CollectionFormModalProps = {
  setIsCreateModalOpen: (isOpen: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  newCollection: {
    name: string;
    fee: string;
    details: string;
    semester: string;
    school_year: string;
    is_archived: boolean;
  };
  setNewCollection: (collection: { name: string; fee: string; details: string; semester: string; school_year: string; is_archived: boolean }) => void;
  handleCreate: (e: React.FormEvent) => void;
  handleEdit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
};

export default function CollectionFormModal({
  setIsCreateModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  newCollection,
  setNewCollection,
  handleCreate,
  handleEdit,
  isSubmitting,
}: CollectionFormModalProps) {
  return (
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
  );
}
