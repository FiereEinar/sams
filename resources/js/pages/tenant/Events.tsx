import Header from '@/components/ui/Header';
import Layout from './Layout';
import EventsTable from '@/components/events/EventsTable';
import EventsOverview from '@/components/events/EventsOverview';
import AddEventButton from '@/components/buttons/AddEventButton';

export default function Events() {
  return (
    <Layout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Header>Organization Events</Header>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Manage and track attendance for your organization's activities.</p>
        </div>
        <div className="flex gap-3">
          <AddEventButton />
        </div>
      </div>

      <EventsOverview />

      <EventsTable />
    </Layout>
  );
}
