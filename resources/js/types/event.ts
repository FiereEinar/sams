export type Event = {
  id: number;
  title: string;
  code: string;
  description: string;
  venue: string;
  start_at: string;
  end_at: string;
};

export type EventForm = {
  title: string;
  description: string;
  venue: string;
  start_at: string;
  end_at: string;
};
