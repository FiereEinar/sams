import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import ImportMasterlist from '@/components/masterlist/ImportMasterlist';
import ImportCooldown from '@/components/masterlist/ImportCooldown';
import ImportPreview from '@/components/masterlist/ImportPreview';
import ImportInformation from '@/components/masterlist/ImportInformation';
import Layout from './Layout';
import type { PaginatedStudents, ImportPreviewData } from '@/types/student';
import MasterlistTable from '@/components/masterlist/MasterlistTable';
import AddStudentButton from '@/components/buttons/AddStudentButton';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

type Tab = 'import' | 'masterlist';

export default function Masterlist() {
  const { students, tenantPlan, nextImportAt } = usePage<{ 
    students: PaginatedStudents; 
    tenantPlan: 'basic' | 'premium'; 
    nextImportAt: string | null; 
  }>().props;
  
  const [activeTab, setActiveTab] = useState<Tab>('masterlist');
  const [previewData, setPreviewData] = useState<ImportPreviewData | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const isCooldownActive = Boolean(tenantPlan === 'basic' && nextImportAt && new Date(nextImportAt) > new Date());

  async function handleFileSelected(file: File) {
    if (isCooldownActive) {
      toast({
        title: 'Cooldown Active',
        description: 'You cannot upload a new masterlist until the cooldown expires.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post('/masterlist/import/preview', formData, {
        headers: {
          'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '',
          Accept: 'application/json',
        },
      });

      setPreviewData(data);
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
    } catch (error: any) {
      console.error('Upload failed: ', error);

      let errorMessage = 'Upload failed';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  }

  async function handleConfirmImport() {
    if (!previewData) return;

    const validRows = previewData.rows.filter((r) => r.status === 'valid').map((r) => r.data);

    if (validRows.length === 0) {
      alert('No valid rows to import.');
      return;
    }

    setIsImporting(true);

    try {
      const { data } = await axios.post(
        '/masterlist/import/store',
        { rows: validRows },
        {
          headers: {
            'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '',
            Accept: 'application/json',
          },
        },
      );

      toast({
        title: 'Success',
        description: data.message,
      });
      setPreviewData(null);
      setActiveTab('masterlist');
      router.reload();
    } catch (error: any) {
      let errorMessage = 'Failed to import. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
    }
  }

  function handleCancelPreview() {
    setPreviewData(null);
  }

  return (
    <Layout>
      <main className="mx-auto flex w-full flex-1 flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          {/* Tabs */}
          <div className="flex w-fit items-center gap-1 rounded-xl bg-surface-dark p-1">
            <button
              onClick={() => setActiveTab('masterlist')}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
                activeTab === 'masterlist' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined !text-[18px]">groups</span>
              Current Masterlist
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
                activeTab === 'import' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined !text-[18px]">upload_file</span>
              Import Masterlist
            </button>
          </div>
          
          {activeTab === 'masterlist' && (
            <AddStudentButton />
          )}
        </div>

        {activeTab === 'import' && (
          <>
            {isCooldownActive && <ImportCooldown nextImportAt={nextImportAt!} />}
            <ImportMasterlist onFileSelected={handleFileSelected} isUploading={isUploading} isCooldownActive={isCooldownActive} />
            {previewData && (
              <ImportPreview data={previewData} onConfirm={handleConfirmImport} onCancel={handleCancelPreview} isImporting={isImporting} />
            )}
            <ImportInformation tenantPlan={tenantPlan} />
          </>
        )}

        {activeTab === 'masterlist' && <MasterlistTable students={students} />}
      </main>
    </Layout>
  );
}
