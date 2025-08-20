export type SessionType = 'online' | 'offline'
export interface Session {
  id: number;
  alocom_event_id?: string;
  title: string;
  lesson_id: number;
  type: SessionType;
  date: Date;       // ISO format: 'YYYY-MM-DD'
  start_time: string; // Format: 'HH:MM:SS'
  end_time: string;   // Format: 'HH:MM:SS'
  duration: string;   // Format: 'HH:MM:SS'
  lat?: string;
  lng?: string;
  address: string;
};
