import { usePage } from '@inertiajs/react';
import CreateStudentForm from '@/components/forms/CreateStudentForm';
import Dialog from '@/components/ui/Dialog';

export default function AddStudentButton() {
  const { props } = usePage();
  const userPermissions: string[] = (props as any).userPermissions || [];

  if (!userPermissions.includes('MASTERLIST_CREATE')) return null;

  return (
    <Dialog
      trigger={(open) => (
        <button
          onClick={open}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
        >
          <span className="material-symbols-outlined text-lg">person_add</span>
          <span>Add Student</span>
        </button>
      )}
    >
      {(close) => (
        <div className="flex items-center justify-center">
          <CreateStudentForm close={close} />
        </div>
      )}
    </Dialog>
  );
}
