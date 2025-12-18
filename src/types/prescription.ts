export interface Diagnosis {
  code: string;          // ICD-10 code
  description: string;
}

export interface Prescription {
  id: string;
  prescriber: {
    name: string;
    npi?: string;
    deaNumber?: string;
  };
  medication: {
    name: string;
    strength?: string;   // e.g., "500mg"
    form?: string;       // e.g., "tablet", "capsule", "injection"
    rxcui?: string;      // RxNorm Concept Unique Identifier
  };
  dosingInstructions: string;  // e.g., "Take 1 tablet by mouth twice daily"
  quantity: number;
  quantityUnit: string;        // e.g., "tablets", "mL"
  daysSupply: number;
  startDate: string;           // ISO 8601 date
  endDate?: string;            // ISO 8601 date (optional for ongoing)
  diagnoses: Diagnosis[];
  status: 'active' | 'completed' | 'discontinued' | 'on_hold';
  patientId: string;
  writtenDate: string;         // ISO 8601 timestamp
}

