import { initializeDatabase, db } from './db';
import { insertNote } from './db/notes';
import { insertLab } from './db/labs';
import { insertMedication } from './db/medications';
import { insertEvidenceDoc } from './db/evidence-docs';
import { Note, Lab, Medication, EvidenceDoc } from './types';

// Seed data
const notes: Note[] = [
  {
    id: 'note-1',
    author: { name: 'Dr. Sarah Chen', role: 'Physician', npi: '1234567890' },
    type: 'progress_note',
    title: 'Follow-up Visit - Diabetes Management',
    content: `## Chief Complaint
Patient presents for routine diabetes follow-up.

## Assessment
- Type 2 Diabetes Mellitus - improving control
- A1c decreased from 8.2% to 7.4%
- Patient reports good adherence to metformin

## Plan
1. Continue current medication regimen
2. Reinforce diet and exercise recommendations
3. Follow up in 3 months with repeat A1c`,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:45:00Z',
    patientId: 'patient-001',
    encounterId: 'enc-001',
  },
  {
    id: 'note-2',
    author: { name: 'Dr. Michael Park', role: 'Cardiologist', npi: '0987654321' },
    type: 'consultation',
    title: 'Cardiology Consultation - Chest Pain Evaluation',
    content: `## Reason for Consultation
Evaluate chest pain and cardiac risk factors.

## History of Present Illness
58-year-old male with history of hypertension and hyperlipidemia presenting with intermittent chest discomfort.

## Recommendations
1. Stress echocardiogram
2. Optimize statin therapy
3. Consider aspirin 81mg daily`,
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    patientId: 'patient-001',
    encounterId: 'enc-002',
  },
];

const labs: Lab[] = [
  {
    id: 'lab-1',
    type: 'Hemoglobin A1c',
    code: '4548-4',
    value: 7.4,
    unit: '%',
    referenceRange: { low: 4.0, high: 5.6 },
    date: '2024-01-15T08:00:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-2',
    type: 'Fasting Glucose',
    code: '1558-6',
    value: 126,
    unit: 'mg/dL',
    referenceRange: { low: 70, high: 100 },
    date: '2024-01-15T07:30:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-3',
    type: 'LDL Cholesterol',
    code: '13457-7',
    value: 142,
    unit: 'mg/dL',
    referenceRange: { low: 0, high: 100 },
    date: '2024-01-18T08:00:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-4',
    type: 'Creatinine',
    code: '2160-0',
    value: 0.9,
    unit: 'mg/dL',
    referenceRange: { low: 0.7, high: 1.3 },
    date: '2024-01-15T08:00:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-5',
    type: 'HDL Cholesterol',
    code: '2085-9',
    value: 38,
    unit: 'mg/dL',
    referenceRange: { low: 40, high: 60 },
    date: '2024-01-18T08:00:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-6',
    type: 'Triglycerides',
    code: '2571-8',
    value: 210,
    unit: 'mg/dL',
    referenceRange: { low: 0, high: 150 },
    date: '2024-01-18T08:00:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-7',
    type: 'Total Cholesterol',
    code: '2093-3',
    value: 222,
    unit: 'mg/dL',
    referenceRange: { low: 0, high: 200 },
    date: '2024-01-18T08:00:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-8',
    type: 'TSH',
    code: '3016-3',
    value: 2.5,
    unit: 'mIU/L',
    referenceRange: { low: 0.4, high: 4.0 },
    date: '2024-01-15T08:00:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-9',
    type: 'Hemoglobin A1c',
    code: '4548-4',
    value: 8.2,
    unit: '%',
    referenceRange: { low: 4.0, high: 5.6 },
    date: '2023-10-12T08:00:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-10',
    type: 'Fasting Glucose',
    code: '1558-6',
    value: 148,
    unit: 'mg/dL',
    referenceRange: { low: 70, high: 100 },
    date: '2023-10-12T07:30:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-11',
    type: 'BUN',
    code: '3094-0',
    value: 18,
    unit: 'mg/dL',
    referenceRange: { low: 7, high: 20 },
    date: '2024-01-15T08:00:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
  {
    id: 'lab-12',
    type: 'eGFR',
    code: '48642-3',
    value: 88,
    unit: 'mL/min/1.73m2',
    referenceRange: { low: 60 },
    date: '2024-01-15T08:00:00Z',
    status: 'final',
    patientId: 'patient-001',
  },
];

const medications: Medication[] = [
  {
    id: 'med-1',
    prescriber: { name: 'Dr. Sarah Chen', npi: '1234567890' },
    drug: {
      name: 'Metformin',
      strength: '500mg',
      form: 'tablet',
      rxcui: '861004',
    },
    dosingInstructions: 'Take 1 tablet by mouth twice daily with meals',
    quantity: 60,
    quantityUnit: 'tablets',
    daysSupply: 30,
    startDate: '2024-01-15',
    diagnoses: [{ code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' }],
    status: 'active',
    patientId: 'patient-001',
    writtenDate: '2024-01-15T10:45:00Z',
  },
  {
    id: 'med-2',
    prescriber: { name: 'Dr. Michael Park', npi: '0987654321' },
    drug: {
      name: 'Atorvastatin',
      strength: '40mg',
      form: 'tablet',
      rxcui: '617312',
    },
    dosingInstructions: 'Take 1 tablet by mouth once daily at bedtime',
    quantity: 30,
    quantityUnit: 'tablets',
    daysSupply: 30,
    startDate: '2024-01-20',
    diagnoses: [{ code: 'E78.00', description: 'Pure hypercholesterolemia, unspecified' }],
    status: 'active',
    patientId: 'patient-001',
    writtenDate: '2024-01-20T14:30:00Z',
  },
  {
    id: 'med-3',
    prescriber: { name: 'Dr. Michael Park', npi: '0987654321' },
    drug: {
      name: 'Aspirin',
      strength: '81mg',
      form: 'tablet',
      rxcui: '243670',
    },
    dosingInstructions: 'Take 1 tablet by mouth once daily',
    quantity: 30,
    quantityUnit: 'tablets',
    daysSupply: 30,
    startDate: '2024-01-20',
    diagnoses: [
      { code: 'Z79.82', description: 'Long term (current) use of aspirin' },
      { code: 'I10', description: 'Essential (primary) hypertension' },
    ],
    status: 'active',
    patientId: 'patient-001',
    writtenDate: '2024-01-20T14:30:00Z',
  },
  {
    id: 'med-4',
    prescriber: { name: 'Dr. Sarah Chen', npi: '1234567890' },
    drug: {
      name: 'Lisinopril',
      strength: '10mg',
      form: 'tablet',
      rxcui: '314076',
    },
    dosingInstructions: 'Take 1 tablet by mouth once daily',
    quantity: 30,
    quantityUnit: 'tablets',
    daysSupply: 30,
    startDate: '2023-06-10',
    diagnoses: [{ code: 'I10', description: 'Essential (primary) hypertension' }],
    status: 'active',
    patientId: 'patient-001',
    writtenDate: '2023-06-10T09:00:00Z',
  },
  {
    id: 'med-5',
    prescriber: { name: 'Dr. Sarah Chen', npi: '1234567890' },
    drug: {
      name: 'Metformin',
      strength: '500mg',
      form: 'tablet',
      rxcui: '861004',
    },
    dosingInstructions: 'Take 1 tablet by mouth once daily with dinner',
    quantity: 30,
    quantityUnit: 'tablets',
    daysSupply: 30,
    startDate: '2023-06-10',
    endDate: '2024-01-15',
    diagnoses: [{ code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' }],
    status: 'completed',
    patientId: 'patient-001',
    writtenDate: '2023-06-10T09:15:00Z',
  },
  {
    id: 'med-6',
    prescriber: { name: 'Dr. Michael Park', npi: '0987654321' },
    drug: {
      name: 'Amlodipine',
      strength: '5mg',
      form: 'tablet',
      rxcui: '329528',
    },
    dosingInstructions: 'Take 1 tablet by mouth once daily',
    quantity: 30,
    quantityUnit: 'tablets',
    daysSupply: 30,
    startDate: '2024-01-20',
    diagnoses: [{ code: 'I10', description: 'Essential (primary) hypertension' }],
    status: 'active',
    patientId: 'patient-001',
    writtenDate: '2024-01-20T14:45:00Z',
  },
  {
    id: 'med-7',
    prescriber: { name: 'Dr. Sarah Chen', npi: '1234567890' },
    drug: {
      name: 'Omeprazole',
      strength: '20mg',
      form: 'capsule',
      rxcui: '198053',
    },
    dosingInstructions: 'Take 1 capsule by mouth once daily before breakfast',
    quantity: 30,
    quantityUnit: 'capsules',
    daysSupply: 30,
    startDate: '2023-11-01',
    diagnoses: [{ code: 'K21.0', description: 'Gastro-esophageal reflux disease with esophagitis' }],
    status: 'active',
    patientId: 'patient-001',
    writtenDate: '2023-11-01T11:00:00Z',
  },
];

const evidenceDocs: EvidenceDoc[] = [
  {
    id: 'doc-1',
    title: 'Diabetes Management Summary',
    description: 'Comprehensive summary of diabetes care for prior authorization',
    sections: [
      { type: 'header', level: 1, text: 'Diabetes Management Evidence' },
      { type: 'paragraph', text: 'This document summarizes the clinical evidence supporting ongoing diabetes management for the patient.' },
      { type: 'divider' },
      { type: 'header', level: 2, text: 'Clinical Notes' },
      {
        type: 'note',
        noteId: 'note-1',
        title: 'Recent Progress Note',
        selections: [
          {
            offset: 0,
            length: 65,
            highlights: [
              { offset: 19, length: 46 }
            ]
          },
          {
            offset: 67,
            length: 150,
            highlights: [
              { offset: 45, length: 32 },
              { offset: 78, length: 40 }
            ]
          }
        ]
      },
      { type: 'divider' },
      { type: 'header', level: 2, text: 'Laboratory Results' },
      { type: 'lab', labIds: ['lab-1', 'lab-2'] },
      { type: 'lab', labIds: ['lab-4'] },
      { type: 'divider' },
      { type: 'header', level: 2, text: 'Current Medications' },
      { type: 'medication', medicationIds: ['med-1'] },
      { type: 'medication', medicationIds: ['med-2', 'med-3'], title: 'Cardiac Medications' },
    ],
    patientId: 'patient-001',
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-16T09:30:00Z',
    createdBy: 'user-001',
    status: 'draft',
  },
];

async function seed() {
  console.log('🌱 Starting database seed...\n');

  // Initialize the database (creates tables)
  initializeDatabase();

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  db.exec('DELETE FROM evidence_docs');
  db.exec('DELETE FROM medications');
  db.exec('DELETE FROM labs');
  db.exec('DELETE FROM notes');

  // Insert notes
  console.log(`📝 Inserting ${notes.length} notes...`);
  for (const note of notes) {
    insertNote(note);
  }

  // Insert labs
  console.log(`🧪 Inserting ${labs.length} labs...`);
  for (const lab of labs) {
    insertLab(lab);
  }

  // Insert medications
  console.log(`💊 Inserting ${medications.length} medications...`);
  for (const medication of medications) {
    insertMedication(medication);
  }

  // Insert evidence docs
  console.log(`📄 Inserting ${evidenceDocs.length} evidence documents...`);
  for (const doc of evidenceDocs) {
    insertEvidenceDoc(doc);
  }

  console.log('\n✅ Database seeded successfully!');
  console.log(`
Summary:
  - Notes: ${notes.length}
  - Labs: ${labs.length}
  - Medications: ${medications.length}
  - Evidence Docs: ${evidenceDocs.length}
  `);

  db.close();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
