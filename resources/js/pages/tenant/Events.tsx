import Header from '@/components/ui/Header';
import Layout from './Layout';
import EventsTable from '@/components/events/EventsTable';
import EventsOverview from '@/components/events/EventsOverview';
import AddEventButton from '@/components/buttons/AddEventButton';
import { Event } from '@/types/event';

type EventsProps = {
  events: Event[];
};

export default function Events({ events }: EventsProps) {
  return (
    <Layout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Header>Organization Events</Header>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Manage and track attendance for your organization's activities.</p>
        </div>
        <AddEventButton />
      </div>

      <EventsOverview />

      <EventsTable events={events} />
    </Layout>
  );
}
