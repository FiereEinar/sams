import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { AttendanceRecord, EventSession } from '@/types/event';

interface AttendanceRecorderProps {
  session: EventSession;
}

export default function AttendanceRecorder({ session }: AttendanceRecorderProps) {
  const [input, setInput] = useState('');
  const [method, setMethod] = useState<'manual' | 'barcode'>('barcode');
  const [records, setRecords] = useState<AttendanceRecord[]>(session.attendance_records ?? []);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'warning' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = session.status === 'active';

  // Auto-focus the input when mode changes or component mounts
  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }
  }, [method, isActive]);

  // Load existing records on mount
  useEffect(() => {
    axios.get(`/sessions/${session.id}/attendance`).then((res) => {
      setRecords(res.data.records);
    });
  }, [session.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSubmitting || !isActive) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await axios.post(`/sessions/${session.id}/attendance`, {
        student_id_input: trimmed,
        method,
      });

      setRecords((prev) => [res.data.record, ...prev]);
      setFeedback({
        message: res.data.found
          ? `✓ ${res.data.record.student.first_name} ${res.data.record.student.last_name}`
          : `⚠ ID "${trimmed}" recorded (not in masterlist)`,
        type: res.data.found ? 'success' : 'warning',
      });
    } catch (err: any) {
      if (err.response?.status === 409) {
        setFeedback({ message: `Already checked in: ${trimmed}`, type: 'error' });
      } else {
        setFeedback({ message: 'Failed to record attendance.', type: 'error' });
      }
    } finally {
      setInput('');
      setIsSubmitting(false);
      inputRef.current?.focus();
    }
  };

  // Clear feedback after 3 seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const feedbackColors = {
    success: 'border-green-500/30 bg-green-500/10 text-green-400',
    warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    error: 'border-red-500/30 bg-red-500/10 text-red-400',
  };

  return (
    <div className="space-y-6">
      {/* Method Toggle + Input */}
      <div className="rounded-2xl border border-white/5 bg-surface-dark p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="material-symbols-outlined text-primary">
              {method === 'barcode' ? 'barcode_scanner' : 'person_search'}
            </span>
            {method === 'barcode' ? 'Barcode Scanner' : 'Manual Entry'}
          </h3>
          <div className="flex rounded-xl bg-background-dark p-1">
            <button
              onClick={() => setMethod('barcode')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${method === 'barcode' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <span className="material-symbols-outlined text-sm">barcode_scanner</span>
            </button>
            <button
              onClick={() => setMethod('manual')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${method === 'manual' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <span className="material-symbols-outlined text-sm">keyboard</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">
              {method === 'barcode' ? 'barcode_scanner' : 'search'}
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!isActive}
              className="w-full rounded-xl border border-white/5 bg-background-dark py-4 pr-4 pl-12 text-lg text-white transition-all placeholder:text-slate-500 focus:border-transparent focus:ring-2 focus:ring-primary disabled:opacity-50"
              placeholder={
                !isActive
                  ? 'Session is not active'
                  : method === 'barcode'
                    ? 'Scan barcode or type Student ID...'
                    : 'Enter Student ID (e.g., 2301106533)'
              }
              type="text"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={!isActive || !input.trim() || isSubmitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">how_to_reg</span>
            Check In
          </button>
        </form>

        {/* Feedback */}
        {feedback && (
          <div className={`mt-4 rounded-xl border px-4 py-3 text-sm font-bold ${feedbackColors[feedback.type]}`}>
            {feedback.message}
          </div>
        )}
      </div>

      {/* Recent Check-ins */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-surface-dark">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h3 className="font-bold text-white">Recent Check-ins</h3>
          <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-primary"></span>
            {records.length} total
          </span>
        </div>

        {records.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            No attendance records yet. Start scanning!
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background-dark/50 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Student ID</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Method</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {records.map((record) => {
                  const initials = record.student
                    ? `${record.student.first_name[0]}${record.student.last_name[0]}`
                    : '??';

                  return (
                    <tr key={record.id} className="transition-colors hover:bg-white/2">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${record.student ? 'bg-primary/10 text-primary' : 'bg-slate-700 text-slate-400'}`}>
                            {initials}
                          </div>
                          <span className="text-sm font-semibold text-white">
                            {record.student
                              ? `${record.student.last_name}, ${record.student.first_name}`
                              : 'Unknown Student'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 font-mono text-xs text-slate-400">{record.student_id_input}</td>
                      <td className="px-6 py-3 text-xs text-slate-400">
                        {new Date(record.recorded_at).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${record.method === 'barcode' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {record.method}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${record.student ? 'border-green-500/20 bg-green-500/10 text-green-400' : 'border-amber-500/20 bg-amber-500/10 text-amber-400'}`}>
                          {record.student ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
