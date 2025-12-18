export type NoteType =
  | 'progress_note'
  | 'consultation'
  | 'discharge_summary'
  | 'history_and_physical'
  | 'procedure_note'
  | 'other';

export interface Note {
  id: string;
  author: {
    name: string;
    role: string;        // e.g., "Physician", "Nurse Practitioner"
    npi?: string;        // National Provider Identifier
  };
  type: NoteType;
  title: string;
  content: string;       // Markdown content
  createdAt: string;     // ISO 8601 timestamp
  updatedAt: string;     // ISO 8601 timestamp
  patientId: string;
  encounterId?: string;
}

