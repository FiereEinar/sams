import { useState, useMemo } from 'react';
import { Event, EventSession } from '@/types/event';
import Layout from './Layout';
import Header from '@/components/ui/Header';
import SessionCard from '@/components/attendance/SessionCard';
import AttendanceRecorder from '@/components/attendance/AttendanceRecorder';
import CreateSessionForm from '@/components/attendance/CreateSessionForm';

type EventDetailsProps = {
  event: Event;
  totalStudents: number;
};

export default function EventDetails({ event, totalStudents }: EventDetailsProps) {
  const sessions = event.sessions ?? [];
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    sessions.find((s) => s.status === 'active')?.id ?? sessions[0]?.id ?? null
  );

  // Always derive selectedSession from the latest props so status changes propagate
  const selectedSession = useMemo(
    () => sessions.find((s) => s.id === selectedSessionId) ?? null,
    [sessions, selectedSessionId]
  );

  const activeSessions = sessions.filter((s) => s.status === 'active' || s.status === 'paused');
  const totalCheckedIn = sessions.reduce(
    (sum, s) => sum + (s.attendance_records_count ?? s.attendance_records?.length ?? 0),
    0
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Event Info Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold tracking-wider text-primary uppercase">
                {event.code}
              </span>
              {activeSessions.length > 0 && (
                <span className="flex items-center gap-1.5 rounded-lg bg-green-500/10 px-2.5 py-1 text-xs font-bold tracking-wider text-green-400 uppercase">
                  <span className="size-1.5 animate-pulse rounded-full bg-green-400"></span>
                  {activeSessions.length} Active Session{activeSessions.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <Header>{event.title}</Header>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                {event.venue}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                {formatDate(event.start_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/5 bg-surface-dark p-5">
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Total Sessions</p>
            <p className="mt-1 text-2xl font-black text-white">{sessions.length}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-surface-dark p-5">
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Active</p>
            <p className="mt-1 text-2xl font-black text-green-400">{activeSessions.length}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-surface-dark p-5">
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Total Check-ins</p>
            <p className="mt-1 text-2xl font-black text-primary">{totalCheckedIn}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-surface-dark p-5">
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Masterlist</p>
            <p className="mt-1 text-2xl font-black text-white">{totalStudents}</p>
          </div>
        </div>

        {/* Event Description */}
        <div className="rounded-2xl border border-white/5 bg-surface-dark p-6">
          <h3 className="mb-2 text-xs font-bold tracking-widest text-slate-500 uppercase">Description</h3>
          <p className="text-sm leading-relaxed text-slate-300">{event.description}</p>
        </div>

        {/* Sessions Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Sessions</h3>
            <CreateSessionForm
              eventId={event.id}
              trigger={(open) => (
                <button
                  onClick={open}
                  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                  New Session
                </button>
              )}
            />
          </div>

          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 py-16 text-center">
              <span className="material-symbols-outlined mb-3 text-5xl text-slate-600">event_note</span>
              <h4 className="text-lg font-bold text-slate-400">No Sessions Yet</h4>
              <p className="mt-1 text-sm text-slate-500">Create the first session to start recording attendance.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  isSelected={selectedSession?.id === session.id}
                  onSelect={(s) => setSelectedSessionId(s.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Attendance Recorder (for selected session) */}
        {selectedSession && (
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              Recording: <span className="text-primary">{selectedSession.name}</span>
              {selectedSession.status !== 'active' && (
                <span className="ml-2 text-sm font-normal text-slate-500">
                  ({selectedSession.status === 'paused' ? 'Paused — resume to record' : selectedSession.status === 'ended' ? 'Session ended' : 'Start session to begin recording'})
                </span>
              )}
            </h3>
            <AttendanceRecorder key={selectedSession.id} session={selectedSession} />
          </div>
        )}
      </div>
    </Layout>
  );
}
