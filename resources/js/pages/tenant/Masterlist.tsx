import ImportMasterlist from '@/components/masterlist/ImportMasterlist';
import Layout from './Layout';
import ImportCooldown from '@/components/masterlist/ImportCooldown';
import ImportPreview from '@/components/masterlist/ImportPreview';
import ImportInformation from '@/components/masterlist/ImportInformation';

export default function Masterlist() {
  return (
    <Layout>
      <main className="mx-auto flex w-full flex-1 flex-col gap-8">
        <ImportCooldown />
        <ImportMasterlist />
        <ImportPreview />
        <ImportInformation />
      </main>
    </Layout>
  );
}
