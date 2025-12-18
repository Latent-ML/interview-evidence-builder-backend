// Section types that reference source data
export interface NoteSection {
  type: 'note';
  noteId: string;
  title?: string;        // Optional override title
}

export interface LabSection {
  type: 'lab';
  labId: string;
  title?: string;
}

export interface PrescriptionSection {
  type: 'prescription';
  prescriptionId: string;
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
  | PrescriptionSection
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

