export type Event = {
  id: number;
  title: string;
  code: string;
  description: string;
  venue: string;
  start_at: string;
  end_at: string;
  sessions?: EventSession[];
};

export type EventForm = {
  title: string;
  description: string;
  venue: string;
  start_at: string;
  end_at: string;
};

export type EventSession = {
  id: number;
  event_id: number;
  name: string;
  status: 'pending' | 'active' | 'paused' | 'ended';
  started_at: string | null;
  paused_at: string | null;
  ended_at: string | null;
  created_at: string;
  attendance_records?: AttendanceRecord[];
  attendance_records_count?: number;
};

export type AttendanceRecord = {
  id: number;
  event_session_id: number;
  student_id: number | null;
  student_id_input: string;
  method: 'manual' | 'barcode';
  recorded_at: string;
  student?: {
    id: number;
    student_id: string;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    course: string | null;
    year: string | null;
    section: string | null;
  } | null;
};
