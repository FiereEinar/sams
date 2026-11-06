import { Transaction } from '@/pages/tenant/Transactions';

type TransactionReceiptModalProps = {
  isOpen: boolean;
  setIsReceiptModalOpen: (isOpen: boolean) => void;
  selectedTransaction: Transaction;
};

export default function TransactionReceiptModal({ isOpen, setIsReceiptModalOpen, selectedTransaction }: TransactionReceiptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 animate-in bg-slate-900/50 backdrop-blur-sm duration-200 fade-in"
        onClick={() => setIsReceiptModalOpen(false)}
      />
      <div className="relative w-full max-w-lg animate-in rounded-2xl bg-white p-6 shadow-xl duration-200 zoom-in-95 fade-in dark:bg-surface-dark">
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Transaction Receipt</h2>
            <div className="text-xs text-slate-500">Ref: #{selectedTransaction.id.toString().padStart(6, '0')}</div>
          </div>
          <button onClick={() => setIsReceiptModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Student ID:</span>
            <span className="font-medium text-slate-900 dark:text-white">{selectedTransaction.student.student_id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Fullname:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {selectedTransaction.student.first_name} {selectedTransaction.student.last_name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Collection:</span>
            <span className="font-medium text-slate-900 dark:text-white">{selectedTransaction.collection?.name || '-'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Total Fee:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              ₱{Number(selectedTransaction.collection?.fee || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Total Paid:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              ₱{Number(selectedTransaction.paid_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Status:</span>
            <span className="font-medium text-slate-900 capitalize dark:text-white">{selectedTransaction.status}</span>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6 dark:border-white/10">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Payment History</h3>
          {selectedTransaction.payments && selectedTransaction.payments.length > 0 ? (
            <div className="space-y-3">
              {selectedTransaction.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/5"
                >
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      ₱{Number(payment.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-slate-500 uppercase">{payment.mode_of_payment}</div>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{new Date(payment.date).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-500">No payment records found.</div>
          )}
        </div>

        <div className="mt-6 pt-4">
          <button
            onClick={() => setIsReceiptModalOpen(false)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-300 dark:hover:bg-white/5"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
