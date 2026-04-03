// Selection and highlight types for note sections
export interface Highlight {
  offset: number;        // Character offset within the selection
  length: number;        // Length of highlighted text
}

export interface NoteSelection {
  offset: number;        // Character offset within the note content
  length: number;        // Length of selected text
  highlights?: Highlight[];  // Optional highlights within the selection
}

// Section types that reference source data
export interface NoteSection {
  type: 'note';
  noteId: string;
  title?: string;              // Optional override title
  selections?: NoteSelection[];  // Optional list of selections to include
}

export interface LabSection {
  type: 'lab';
  labIds: string[];      // Multiple labs can be rendered together
  title?: string;
}

export interface MedicationSection {
  type: 'medication';
  medicationIds: string[];  // Multiple medications can be rendered together
  title?: string;
}

// Simple content section types
export interface HeaderSection {
  type: 'header';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface ParagraphSection {
  type: 'paragraph';
  text: string;          // Markdown supported
}

export interface DividerSection {
  type: 'divider';
}

// Union of all section types
export type EvidenceSection =
  | NoteSection
  | LabSection
  | MedicationSection
  | HeaderSection
  | ParagraphSection
  | DividerSection;

export interface EvidenceDoc {
  id: string;
  title: string;
  description?: string;
  sections: EvidenceSection[];  // Ordered list of sections
  patientId: string;
  createdAt: string;            // ISO 8601 timestamp
  updatedAt: string;            // ISO 8601 timestamp
  createdBy: string;
  status: 'draft' | 'final' | 'archived';
}

// API Request/Response Types
export interface CreateEvidenceDocRequest {
  title: string;
  description?: string;
  sections: EvidenceSection[];
  patientId: string;
  createdBy: string;
  status?: 'draft' | 'final' | 'archived';
}

export interface UpdateEvidenceDocRequest {
  title?: string;
  description?: string;
  sections?: EvidenceSection[];
  status?: 'draft' | 'final' | 'archived';
}

