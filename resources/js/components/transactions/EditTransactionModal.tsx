import { Transaction } from '@/pages/tenant/Transactions';

type EditTransactionModalProps = {
  setIsEditModalOpen: (isOpen: boolean) => void;
  selectedTransaction: Transaction;
  handleEdit: (e: React.FormEvent) => void;
  editForm: { description: string; details: Record<string, string> };
  setEditForm: (editForm: { description: string; details: Record<string, string> }) => void;
  isSubmitting: boolean;
};

export default function EditTransactionModal({
  setIsEditModalOpen,
  selectedTransaction,
  handleEdit,
  editForm,
  setEditForm,
  isSubmitting,
}: EditTransactionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 animate-in bg-slate-900/50 backdrop-blur-sm duration-200 fade-in" onClick={() => setIsEditModalOpen(false)} />
      <div className="relative w-full max-w-md animate-in rounded-2xl bg-white p-6 shadow-xl duration-200 zoom-in-95 fade-in dark:bg-surface-dark">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Edit Transaction</h2>
          <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleEdit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm transition-colors outline-none focus:border-primary dark:border-white/10 dark:text-white"
              placeholder="Optional description"
              rows={3}
            />
          </div>

          {selectedTransaction.collection?.details && selectedTransaction.collection.details.length > 0 && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Collection Details</label>
              <div className="grid gap-4 sm:grid-cols-2">
                {selectedTransaction.collection.details.map((detailKey: string) => (
                  <div key={detailKey}>
                    <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">{detailKey}</label>
                    <input
                      type="text"
                      required
                      value={editForm.details[detailKey] || ''}
                      onChange={(e) => setEditForm({ ...editForm, details: { ...editForm.details, [detailKey]: e.target.value } })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/40 dark:border-white/10 dark:bg-surface-dark dark:text-white"
                      placeholder={`Enter ${detailKey}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
