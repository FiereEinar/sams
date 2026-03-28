import { router } from '@inertiajs/react';
import { EventSession } from '@/types/event';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

interface SessionCardProps {
  session: EventSession;
  isSelected: boolean;
  onSelect: (session: EventSession) => void;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-slate-500/10 text-slate-400', dot: 'bg-slate-400' },
  active: { label: 'Live', color: 'bg-green-500/10 text-green-400', dot: 'bg-green-400 animate-pulse' },
  paused: { label: 'Paused', color: 'bg-amber-500/10 text-amber-400', dot: 'bg-amber-400' },
  ended: { label: 'Ended', color: 'bg-red-500/10 text-red-400', dot: 'bg-red-400' },
};

export default function SessionCard({ session, isSelected, onSelect }: SessionCardProps) {
  const config = statusConfig[session.status];
  const recordCount = session.attendance_records_count ?? session.attendance_records?.length ?? 0;

  const handleAction = (action: string) => {
    router.post(`/sessions/${session.id}/${action}`, {}, {
      preserveScroll: true,
    });
  };

  return (
    <div
      onClick={() => onSelect(session)}
      className={`cursor-pointer rounded-2xl border p-5 transition-all ${
        isSelected
          ? 'border-primary/50 bg-primary/5 ring-2 ring-primary/20'
          : 'border-white/5 bg-surface-dark hover:border-white/10'
      }`}
    >
      <div className="mb-3 flex items-start justify-between">
        <h5 className="font-bold text-white">{session.name}</h5>
        <span className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-bold tracking-wider uppercase ${config.color}`}>
          <span className={`size-1.5 rounded-full ${config.dot}`}></span>
          {config.label}
        </span>
      </div>

      <div className="mb-4 flex items-center gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">people</span>
          {recordCount} checked in
        </span>
        {session.started_at && (
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">schedule</span>
            {new Date(session.started_at).toLocaleTimeString()}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {session.status === 'pending' && (
          <button
            onClick={(e) => { e.stopPropagation(); handleAction('start'); }}
            className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-green-500/10 py-2 text-xs font-bold text-green-400 transition-all hover:bg-green-500/20"
          >
            <span className="material-symbols-outlined text-sm">play_arrow</span>
            Start
          </button>
        )}
        {session.status === 'active' && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handleAction('pause'); }}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-amber-500/10 py-2 text-xs font-bold text-amber-400 transition-all hover:bg-amber-500/20"
            >
              <span className="material-symbols-outlined text-sm">pause</span>
              Pause
            </button>
            <ConfirmDialog
              title="End Session"
              description={`Are you sure you want to end "${session.name}"? This action cannot be undone and no more attendance can be recorded.`}
              confirmText="End Session"
              onConfirm={(close) => { handleAction('end'); close(); }}
              trigger={(open) => (
                <button
                  onClick={(e) => { e.stopPropagation(); open(); }}
                  className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-red-500/10 py-2 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20"
                >
                  <span className="material-symbols-outlined text-sm">stop</span>
                  End
                </button>
              )}
            />
          </>
        )}
        {session.status === 'paused' && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handleAction('resume'); }}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-green-500/10 py-2 text-xs font-bold text-green-400 transition-all hover:bg-green-500/20"
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              Resume
            </button>
            <ConfirmDialog
              title="End Session"
              description={`Are you sure you want to end "${session.name}"? This action cannot be undone and no more attendance can be recorded.`}
              confirmText="End Session"
              onConfirm={(close) => { handleAction('end'); close(); }}
              trigger={(open) => (
                <button
                  onClick={(e) => { e.stopPropagation(); open(); }}
                  className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-red-500/10 py-2 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20"
                >
                  <span className="material-symbols-outlined text-sm">stop</span>
                  End
                </button>
              )}
            />
          </>
        )}
        {session.status === 'ended' && (
          <span className="flex flex-1 items-center justify-center gap-1 py-2 text-xs font-bold text-slate-500">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Session Complete
          </span>
        )}
      </div>
    </div>
  );
}
