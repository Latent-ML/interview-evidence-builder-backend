import { db } from './connection';
import { Prescription } from '../types';

interface PrescriptionRow {
  id: string;
  prescriber: string;
  medication: string;
  dosingInstructions: string;
  quantity: number;
  quantityUnit: string;
  daysSupply: number;
  startDate: string;
  endDate: string | null;
  diagnoses: string;
  status: string;
  patientId: string;
  writtenDate: string;
}

function rowToPrescription(row: PrescriptionRow): Prescription {
  return {
    id: row.id,
    prescriber: JSON.parse(row.prescriber),
    medication: JSON.parse(row.medication),
    dosingInstructions: row.dosingInstructions,
    quantity: row.quantity,
    quantityUnit: row.quantityUnit,
    daysSupply: row.daysSupply,
    startDate: row.startDate,
    endDate: row.endDate ?? undefined,
    diagnoses: JSON.parse(row.diagnoses),
    status: row.status as Prescription['status'],
    patientId: row.patientId,
    writtenDate: row.writtenDate,
  };
}

export function getAllPrescriptions(): Prescription[] {
  const stmt = db.prepare('SELECT * FROM prescriptions ORDER BY writtenDate DESC');
  const rows = stmt.all() as PrescriptionRow[];
  return rows.map(rowToPrescription);
}

export function getPrescriptionById(id: string): Prescription | null {
  const stmt = db.prepare('SELECT * FROM prescriptions WHERE id = ?');
  const row = stmt.get(id) as PrescriptionRow | undefined;
  return row ? rowToPrescription(row) : null;
}

export function insertPrescription(prescription: Prescription): void {
  const stmt = db.prepare(`
    INSERT INTO prescriptions (id, prescriber, medication, dosingInstructions, quantity, quantityUnit, daysSupply, startDate, endDate, diagnoses, status, patientId, writtenDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    prescription.id,
    JSON.stringify(prescription.prescriber),
    JSON.stringify(prescription.medication),
    prescription.dosingInstructions,
    prescription.quantity,
    prescription.quantityUnit,
    prescription.daysSupply,
    prescription.startDate,
    prescription.endDate ?? null,
    JSON.stringify(prescription.diagnoses),
    prescription.status,
    prescription.patientId,
    prescription.writtenDate
  );
}

export function updatePrescription(id: string, prescription: Partial<Prescription>): void {
  const existing = getPrescriptionById(id);
  if (!existing) return;

  const updated = { ...existing, ...prescription };
  const stmt = db.prepare(`
    UPDATE prescriptions 
    SET prescriber = ?, medication = ?, dosingInstructions = ?, quantity = ?, quantityUnit = ?, 
        daysSupply = ?, startDate = ?, endDate = ?, diagnoses = ?, status = ?, patientId = ?, writtenDate = ?
    WHERE id = ?
  `);
  stmt.run(
    JSON.stringify(updated.prescriber),
    JSON.stringify(updated.medication),
    updated.dosingInstructions,
    updated.quantity,
    updated.quantityUnit,
    updated.daysSupply,
    updated.startDate,
    updated.endDate ?? null,
    JSON.stringify(updated.diagnoses),
    updated.status,
    updated.patientId,
    updated.writtenDate,
    id
  );
}

export function deletePrescription(id: string): boolean {
  const stmt = db.prepare('DELETE FROM prescriptions WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

