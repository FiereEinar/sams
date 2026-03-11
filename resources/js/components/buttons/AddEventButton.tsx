import CreateEventForm from '../forms/CreateEventForm';
import Dialog from '../ui/Dialog';

export default function AddEventButton() {
  return (
    <Dialog
      trigger={(open) => (
        <button
          onClick={open}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span>Create New Event</span>
        </button>
      )}
    >
      {(close) => (
        <div className="flex items-center justify-center">
          <CreateEventForm close={close} />
        </div>
      )}
    </Dialog>
  );
}
