export interface Lab {
  id: string;
  type: string;          // e.g., "Hemoglobin A1c", "Complete Blood Count"
  code?: string;         // LOINC code or similar
  value: string | number;
  unit: string;          // e.g., "%", "mg/dL", "cells/mcL"
  referenceRange?: {
    low?: number;
    high?: number;
  };
  date: string;          // ISO 8601 timestamp
  status: 'preliminary' | 'final' | 'corrected';
  patientId: string;
}

