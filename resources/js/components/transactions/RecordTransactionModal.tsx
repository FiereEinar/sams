import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useToast } from '@/hooks/use-toast';

type Collection = {
  id: number;
  name: string;
  fee: number;
  details: string[];
  is_archived: boolean;
};

type StudentSearch = {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
};

type RecordTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  collections: Collection[];
};

export default function RecordTransactionModal({ isOpen, onClose, collections }: RecordTransactionModalProps) {
  const [studentSearch, setStudentSearch] = useState('');
  const [studentResults, setStudentResults] = useState<StudentSearch[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentSearch | null>(null);
  const [studentBalances, setStudentBalances] = useState<any[]>([]);
  const { toast } = useToast();

  const [modeOfPayment, setModeOfPayment] = useState<'cash' | 'gcash'>('cash');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const [selectedCategories, setSelectedCategories] = useState<
    {
      id: number;
      details: Record<string, string>;
      amount_paid: number;
    }[]
  >([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (studentSearch.length > 2 && !selectedStudent) {
      const delayFn = setTimeout(async () => {
        try {
          const res = await fetch(`/transactions/students/search?q=${encodeURIComponent(studentSearch)}`);
          if (res.ok) {
            const data = await res.json();
            setStudentResults(data);
          }
        } catch (e) {
          console.error(e);
        }
      }, 300);
      return () => clearTimeout(delayFn);
    } else {
      setStudentResults([]);
    }
  }, [studentSearch, selectedStudent]);

  useEffect(() => {
    if (selectedStudent) {
      fetch(`/transactions/students/${selectedStudent.id}/balances`)
        .then((res) => res.json())
        .then((data) => setStudentBalances(data))
        .catch(console.error);
    } else {
      setStudentBalances([]);
      setSelectedCategories([]);
    }
  }, [selectedStudent]);

  if (!isOpen) return null;

  const toggleCategory = (collection: Collection, remainingBalance: number) => {
    if (selectedCategories.find((c) => c.id === collection.id)) {
      setSelectedCategories(selectedCategories.filter((c) => c.id !== collection.id));
    } else {
      const initialDetails: Record<string, string> = {};
      
      const existingTx = studentBalances.find((b) => b.collection_id === collection.id);
      if (existingTx && existingTx.details) {
        // Pre-fill existing details if any
        Object.keys(existingTx.details).forEach((k) => {
          initialDetails[k] = existingTx.details[k];
        });
      } else {
        (collection.details || []).forEach((d) => {
          initialDetails[d] = '';
        });
      }
      
      setSelectedCategories([...selectedCategories, { id: collection.id, details: initialDetails, amount_paid: remainingBalance }]);
    }
  };

  const updateCategoryDetail = (collectionId: number, key: string, value: string) => {
    setSelectedCategories(
      selectedCategories.map((c) => {
        if (c.id === collectionId) {
          return { ...c, details: { ...c.details, [key]: value } };
        }
        return c;
      }),
    );
  };

  const updateCategoryAmount = (collectionId: number, amount: number) => {
    setSelectedCategories(
      selectedCategories.map((c) => {
        if (c.id === collectionId) {
          return { ...c, amount_paid: amount };
        }
        return c;
      }),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) {
      toast({ title: 'Error', description: 'Please select a student', variant: 'destructive' });
      return;
    }
    if (selectedCategories.length === 0) {
      toast({ title: 'Error', description: 'Please select at least one category', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    router.post(
      '/transactions',
      {
        student_id: selectedStudent.id,
        mode_of_payment: modeOfPayment,
        date,
        description,
        categories: selectedCategories,
      },
      {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Transaction recorded successfully' });
          onClose();
          // Reset state
          setSelectedStudent(null);
          setStudentSearch('');
          setSelectedCategories([]);
          setDescription('');
        },
        onFinish: () => setIsSubmitting(false),
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 animate-in bg-slate-900/50 backdrop-blur-sm duration-200 fade-in" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-2xl animate-in flex-col rounded-2xl bg-white shadow-xl duration-200 zoom-in-95 fade-in dark:bg-surface-dark">
        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-white/10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Record Transaction</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
          <form id="record-transaction-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Student Search */}
            <div className="relative">
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Student</label>
              {selectedStudent ? (
                <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {selectedStudent.first_name} {selectedStudent.last_name}
                      </div>
                      <div className="text-xs text-slate-500">{selectedStudent.student_id}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStudent(null);
                      setStudentSearch('');
                    }}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">search</span>
                    <input
                      type="text"
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      placeholder="Search student by ID or Name..."
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-10 text-sm text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                    />
                  </div>
                  {studentResults.length > 0 && (
                    <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-white/10 dark:bg-surface-dark">
                      {studentResults.map((student) => (
                        <button
                          key={student.id}
                          type="button"
                          onClick={() => {
                            setSelectedStudent(student);
                            setStudentResults([]);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/5"
                        >
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                              {student.first_name} {student.last_name}
                            </div>
                            <div className="text-xs text-slate-500">{student.student_id}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Mode of Payment</label>
                <select
                  value={modeOfPayment}
                  onChange={(e) => setModeOfPayment(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                >
                  <option value="cash">Cash</option>
                  <option value="gcash">GCash</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Categories / Collections</label>
              <div className="space-y-3">
                {collections
                  .filter((c) => !c.is_archived)
                  .map((collection) => {
                    const isSelected = selectedCategories.some((c) => c.id === collection.id);
                    const selectedData = selectedCategories.find((c) => c.id === collection.id);

                    const existingTx = studentBalances.find((b) => b.collection_id === collection.id);
                    const paidAmount = existingTx ? Number(existingTx.paid_amount) : 0;
                    const remainingBalance = collection.fee - paidAmount;
                    const isFullyPaid = remainingBalance <= 0;

                    return (
                      <div
                        key={collection.id}
                        className={`rounded-xl border ${isSelected ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white dark:border-white/10 dark:bg-background-dark'} p-4 transition-colors`}
                      >
                        <div className="flex items-center justify-between">
                          <label className={`flex items-center gap-3 font-medium select-none ${isFullyPaid || !selectedStudent ? 'cursor-not-allowed opacity-60 text-slate-500' : 'cursor-pointer text-slate-800 dark:text-slate-200'}`}>
                            {isFullyPaid ? (
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/20">
                                <span className="material-symbols-outlined text-[14px]">check</span>
                              </div>
                            ) : (
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isFullyPaid || !selectedStudent}
                                onChange={() => toggleCategory(collection, remainingBalance)}
                                className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary disabled:opacity-50 dark:border-white/20 dark:bg-white/5"
                              />
                            )}
                            <span>{collection.name}</span>
                          </label>
                          <div className="text-right">
                            <div className="font-semibold text-slate-700 dark:text-slate-300">
                              Fee: ₱{Number(collection.fee).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                            {existingTx && (
                              <div className="text-xs text-slate-500">
                                Paid: ₱{Number(paidAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </div>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="mt-4 border-t border-primary/20 pt-4">
                            <div className="mb-4">
                              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Amount to Pay</label>
                              <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                max={remainingBalance}
                                required
                                value={selectedData?.amount_paid ?? ''}
                                onChange={(e) => updateCategoryAmount(collection.id, parseFloat(e.target.value))}
                                className="w-full max-w-50 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/40 dark:border-white/10 dark:bg-surface-dark dark:text-white"
                                placeholder={`Enter amount (Max: ₱${remainingBalance})`}
                              />
                              <p className="mt-1 text-[11px] text-slate-500">
                                {existingTx ? `Partial payment. Remaining balance: ₱${remainingBalance}` : `Defaults to full fee (₱${remainingBalance}). Change for partial payment.`}
                              </p>
                            </div>

                            {collection.details && collection.details.length > 0 && (
                              <div className="grid gap-4 sm:grid-cols-2">
                                {collection.details.map((detailKey) => (
                                  <div key={detailKey}>
                                    <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">{detailKey}</label>
                                    <input
                                      type="text"
                                      required
                                      value={selectedData?.details[detailKey] || ''}
                                      onChange={(e) => updateCategoryDetail(collection.id, detailKey, e.target.value)}
                                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/40 dark:border-white/10 dark:bg-surface-dark dark:text-white"
                                      placeholder={`Enter ${detailKey}`}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                {collections.filter((c) => !c.is_archived).length === 0 && (
                  <div className="text-sm text-slate-500 dark:text-slate-400">No active collections found.</div>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                placeholder="Any additional notes..."
              ></textarea>
            </div>
          </form>
        </div>

        <div className="border-t border-slate-200 p-6 dark:border-white/10">
          <div className="mb-4 flex items-center justify-between text-lg font-bold text-slate-900 dark:text-white">
            <span>Total Amount:</span>
            <span>
              ₱
              {selectedCategories
                .reduce((acc, curr) => {
                  return acc + (curr.amount_paid || 0);
                }, 0)
                .toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <button
            type="submit"
            form="record-transaction-form"
            disabled={isSubmitting || selectedCategories.length === 0 || !selectedStudent}
            className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {isSubmitting ? 'Recording...' : 'Record Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
