export type Student = {
  id: number;
  student_id: string;
  last_name: string;
  first_name: string;
  middle_name: string | null;
  sex: string | null;
  course: string | null;
  year: string | null;
  units: string | null;
  section: string | null;
};

export type ImportRow = {
  data: {
    student_id: string | null;
    last_name: string | null;
    first_name: string | null;
    middle_name?: string | null;
    sex?: string | null;
    course?: string | null;
    year?: string | null;
    units?: string | null;
    section?: string | null;
  };
  status: 'valid' | 'invalid' | 'duplicate';
  row_number: number;
};

export type ImportPreviewData = {
  columns: Record<string, number>;
  detected_headers: Record<string, string>;
  rows: ImportRow[];
  summary: {
    valid: number;
    invalid: number;
    duplicate: number;
  };
};

export type PaginatedStudents = {
  data: Student[];
  current_page: number;
  last_page: number;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  per_page: number;
  from: number;
  to: number;
};
