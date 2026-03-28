import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import ImportMasterlist from '@/components/masterlist/ImportMasterlist';
import ImportCooldown from '@/components/masterlist/ImportCooldown';
import ImportPreview from '@/components/masterlist/ImportPreview';
import ImportInformation from '@/components/masterlist/ImportInformation';
import Layout from './Layout';
import type { PaginatedStudents, ImportPreviewData } from '@/types/student';
import MasterlistTable from '@/components/masterlist/MasterlistTable';
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
        <div className="mb-4 flex gap-6 border-b border-slate-200 dark:border-white/10">
          <button
            onClick={() => setActiveTab('masterlist')}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'masterlist'
                ? 'border-b-2 border-primary text-primary'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            Current Masterlist
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'import'
                ? 'border-b-2 border-primary text-primary'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            Import Masterlist
          </button>
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
