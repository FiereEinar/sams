import { useState, useEffect } from 'react';
import { ReactNode } from 'react';
import Dialog from '../ui/Dialog';
import axios from 'axios';

interface ExportAttendanceDialogProps {
  sessionId: number;
  trigger: (open: () => void) => ReactNode;
}

export default function ExportAttendanceDialog({ sessionId, trigger }: ExportAttendanceDialogProps) {
  return (
    <Dialog trigger={trigger}>
      {(close) => <ExportForm sessionId={sessionId} close={close} />}
    </Dialog>
  );
}

function ExportForm({ sessionId, close }: { sessionId: number; close: () => void }) {
  const [filter, setFilter] = useState<'all' | 'course' | 'section'>('all');
  const [courses, setCourses] = useState<string[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch unique courses and sections from this session's records
  useEffect(() => {
    axios.get(`/sessions/${sessionId}/attendance`).then((res) => {
      const records = res.data.records;
      const uniqueCourses = [...new Set<string>(
        records.map((r: any) => r.student?.course).filter(Boolean)
      )].sort();
      const uniqueSections = [...new Set<string>(
        records.map((r: any) => r.student?.section).filter(Boolean)
      )].sort();
      setCourses(uniqueCourses);
      setSections(uniqueSections);
      if (uniqueCourses.length > 0) setSelectedCourse(uniqueCourses[0]);
      if (uniqueSections.length > 0) setSelectedSection(uniqueSections[0]);
      setLoading(false);
    });
  }, [sessionId]);

  const handleExport = () => {
    const params = new URLSearchParams();
    if (filter === 'course' && selectedCourse) params.set('course', selectedCourse);
    if (filter === 'section' && selectedSection) params.set('section', selectedSection);

    const url = `/sessions/${sessionId}/attendance/export?${params.toString()}`;
    window.open(url, '_blank');
    close();
  };

  return (
    <div className="modal-glow flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-white/5 bg-white shadow-2xl md:w-md dark:bg-[#16212b]">
      <header className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
            <span className="material-symbols-outlined text-primary">download</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Export Attendance</h2>
            <p className="text-xs text-slate-400">Download records as CSV</p>
          </div>
        </div>
        <button onClick={close} className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </header>

      <div className="flex-1 space-y-4 px-6 pb-6">
        {/* Filter options */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-400">Export Filter</label>
          <div className="grid grid-cols-3 gap-2">
            {(['all', 'course', 'section'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`rounded-xl py-2.5 text-xs font-bold capitalize transition-all ${
                  filter === opt
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-background-dark text-slate-400 hover:text-white'
                }`}
              >
                {opt === 'all' ? 'All Records' : `By ${opt}`}
              </button>
            ))}
          </div>
        </div>

        {/* Course selector */}
        {filter === 'course' && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400">Select Course</label>
            {loading ? (
              <div className="h-10 animate-pulse rounded-xl bg-background-dark"></div>
            ) : courses.length === 0 ? (
              <p className="text-xs text-slate-500">No course data available in records.</p>
            ) : (
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-background-dark px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary"
              >
                {courses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Section selector */}
        {filter === 'section' && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400">Select Section</label>
            {loading ? (
              <div className="h-10 animate-pulse rounded-xl bg-background-dark"></div>
            ) : sections.length === 0 ? (
              <p className="text-xs text-slate-500">No section data available in records.</p>
            ) : (
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-background-dark px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary"
              >
                {sections.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>

      <footer className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-white/10 dark:bg-[#111a22]">
        <button onClick={close} className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-400 hover:bg-white/5">
          Cancel
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Export CSV
        </button>
      </footer>
    </div>
  );
}
