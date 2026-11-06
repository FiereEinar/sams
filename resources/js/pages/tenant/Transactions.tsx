import Header from '@/components/ui/Header';
import Layout from './Layout';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import RecordTransactionModal from '@/components/transactions/RecordTransactionModal';
import { useToast } from '@/hooks/use-toast';
import Dialog from '@/components/ui/Dialog';
import TransactionReceiptModal from '@/components/transactions/TransactionReceiptModal';
import EditTransactionModal from '@/components/transactions/EditTransactionModal';

type TransactionPayment = {
  id: number;
  amount: number;
  date: string;
  mode_of_payment: string;
};

export type Transaction = {
  id: number;
  paid_amount: number;
  status: 'pending' | 'partial' | 'paid';
  date: string;
  description: string;
  details: Record<string, string>;
  student: {
    first_name: string;
    last_name: string;
    student_id: string;
  };
  collection: {
    name: string;
    fee: number;
    details: string[];
  };
  payments: TransactionPayment[];
};

type Collection = {
  id: number;
  name: string;
  fee: number;
  details: string[];
  is_archived: boolean;
};

type TransactionsProps = {
  transactions: {
    data: Transaction[];
    links: any[];
  };
  collections: Collection[];
};

export default function Transactions({ transactions, collections }: TransactionsProps) {
  const { props } = usePage();
  const { toast } = useToast();
  const permissions = (props as any).userPermissions || [];
  const canCreate = permissions.includes('TRANSACTIONS_CREATE');
  const canEdit = permissions.includes('TRANSACTIONS_UPDATE');
  const canDelete = permissions.includes('TRANSACTIONS_DELETE');

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const [editForm, setEditForm] = useState({
    description: '',
    details: {} as Record<string, string>,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const openEditModal = (t: Transaction) => {
    setSelectedTransaction(t);
    setEditForm({
      description: t.description || '',
      details: t.details || {},
    });
    setIsEditModalOpen(true);
  };

  const openReceiptModal = (t: Transaction) => {
    setSelectedTransaction(t);
    setIsReceiptModalOpen(true);
  };

  const openDeleteDialog = (t: Transaction) => {
    setSelectedTransaction(t);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransaction) return;
    setIsSubmitting(true);

    router.put(`/transactions/${selectedTransaction.id}`, editForm, {
      onSuccess: () => {
        setIsEditModalOpen(false);
        setSelectedTransaction(null);
        toast({ title: 'Success', description: 'Transaction updated successfully' });
      },
      onFinish: () => setIsSubmitting(false),
    });
  };

  const handleDelete = () => {
    if (!selectedTransaction) return;
    setIsSubmitting(true);

    router.delete(`/transactions/${selectedTransaction.id}`, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setSelectedTransaction(null);
        toast({ title: 'Success', description: 'Transaction deleted successfully' });
      },
      onFinish: () => setIsSubmitting(false),
    });
  };

  return (
    <Layout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Header>Transactions</Header>
          <p className="mt-1 text-slate-500 dark:text-slate-400">View and record payments from students.</p>
        </div>
        {canCreate && (
          <button
            onClick={() => setIsRecordModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Record Transaction
          </button>
        )}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-surface-dark">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50/50 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Collection</th>
                <th className="px-6 py-4 text-right font-medium">Amount Paid</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {transactions.data.map((transaction) => (
                <tr
                  key={transaction.id}
                  // onClick={() => openReceiptModal(transaction)}
                  className="cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {getInitials(transaction.student.first_name, transaction.student.last_name)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {transaction.student.first_name} {transaction.student.last_name}
                        </div>
                        <div className="text-xs text-slate-500">{transaction.student.student_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-700 dark:text-slate-300">{transaction.collection?.name || '-'}</div>
                    {transaction.details && Object.keys(transaction.details).length > 0 && (
                      <div className="mt-1 text-xs text-slate-500">
                        {Object.entries(transaction.details)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(', ')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-medium text-slate-900 dark:text-white">
                      ₱{Number(transaction.paid_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-slate-500">
                      Fee: ₱{Number(transaction.collection?.fee || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {transaction.status === 'paid' && (
                      <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-500/20 dark:text-green-400">
                        Paid
                      </span>
                    )}
                    {transaction.status === 'partial' && (
                      <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400">
                        Partial
                      </span>
                    )}
                    {transaction.status === 'pending' && (
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-white/10 dark:text-slate-400">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openReceiptModal(transaction)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        title="View Receipt"
                      >
                        <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                      </button>
                      {canEdit && (
                        <button
                          onClick={() => openEditModal(transaction)}
                          className="text-primary hover:text-primary-hover dark:text-primary/80 dark:hover:text-primary"
                          title="Edit Transaction"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => openDeleteDialog(transaction)}
                          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete Transaction"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {transactions.data.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RecordTransactionModal isOpen={isRecordModalOpen} onClose={() => setIsRecordModalOpen(false)} collections={collections} />

      {isReceiptModalOpen && selectedTransaction && (
        <TransactionReceiptModal
          isOpen={isReceiptModalOpen}
          setIsReceiptModalOpen={setIsReceiptModalOpen}
          selectedTransaction={selectedTransaction}
        />
      )}

      {isEditModalOpen && selectedTransaction && (
        <EditTransactionModal
          editForm={editForm}
          setEditForm={setEditForm}
          isSubmitting={isSubmitting}
          handleEdit={handleEdit}
          selectedTransaction={selectedTransaction}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction? This action cannot be undone and will remove all associated payment history."
        confirmText={isSubmitting ? 'Deleting...' : 'Delete'}
        onConfirm={handleDelete}
        variant="danger"
      />
    </Layout>
  );
}
