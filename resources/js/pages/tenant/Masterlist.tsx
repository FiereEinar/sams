import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import ImportMasterlist from '@/components/masterlist/ImportMasterlist';
import ImportCooldown from '@/components/masterlist/ImportCooldown';
import ImportPreview from '@/components/masterlist/ImportPreview';
import ImportInformation from '@/components/masterlist/ImportInformation';
import Layout from './Layout';
import type { Student, ImportPreviewData } from '@/types/student';
import MasterlistTable from '@/components/masterlist/MasterlistTable';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

type Tab = 'import' | 'masterlist';

export default function Masterlist() {
  const { students } = usePage<{ students: Student[] }>().props;
  const [activeTab, setActiveTab] = useState<Tab>('masterlist');
  const [previewData, setPreviewData] = useState<ImportPreviewData | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  async function handleFileSelected(file: File) {
    try {
      setIsUploading(true);
      console.log(file);

      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post('/masterlist/import/preview', formData);
      setPreviewData(data);
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
    } catch (error: any) {
      console.error('Upload failed: ', error);
      toast({
        title: 'Error',
        description: error.error || error.message || 'Upload failed',
        variant: 'destructive',
      });
      throw new Error(error.error || error.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }

    // fetch('/masterlist/import/preview', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '',
    //     Accept: 'application/json',
    //   },
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       return res.json().then((data) => {
    //         throw new Error(data.error || data.message || 'Upload failed');
    //       });
    //     }
    //     return res.json();
    //   })
    //   .then((data: ImportPreviewData) => {
    //     setPreviewData(data);
    //   })
    //   .catch((err) => {
    //     alert(err.message || 'Failed to parse file. Please check the format.');
    //   })
    //   .finally(() => {
    //     setIsUploading(false);
    //   });
  }

  function handleConfirmImport() {
    if (!previewData) return;

    const validRows = previewData.rows.filter((r) => r.status === 'valid').map((r) => r.data);

    if (validRows.length === 0) {
      alert('No valid rows to import.');
      return;
    }

    setIsImporting(true);

    fetch('/masterlist/import/store', {
      method: 'POST',
      body: JSON.stringify({ rows: validRows }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Import failed');
          });
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        setPreviewData(null);
        setActiveTab('masterlist');
        router.reload();
      })
      .catch((err) => {
        alert(err.message || 'Failed to import. Please try again.');
      })
      .finally(() => {
        setIsImporting(false);
      });
  }

  function handleCancelPreview() {
    setPreviewData(null);
  }

  return (
    <Layout>
      <main className="mx-auto flex w-full flex-1 flex-col gap-8">
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

        {activeTab === 'import' && (
          <>
            <ImportCooldown />
            <ImportMasterlist onFileSelected={handleFileSelected} isUploading={isUploading} />
            {previewData && (
              <ImportPreview data={previewData} onConfirm={handleConfirmImport} onCancel={handleCancelPreview} isImporting={isImporting} />
            )}
            <ImportInformation />
          </>
        )}

        {activeTab === 'masterlist' && <MasterlistTable students={students} />}
      </main>
    </Layout>
  );
}
