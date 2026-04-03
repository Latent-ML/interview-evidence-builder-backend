import { db } from './connection';
import { Medication } from '../types';

interface MedicationRow {
  id: string;
  prescriber: string;
  drug: string;
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

function rowToMedication(row: MedicationRow): Medication {
  return {
    id: row.id,
    prescriber: JSON.parse(row.prescriber),
    drug: JSON.parse(row.drug),
    dosingInstructions: row.dosingInstructions,
    quantity: row.quantity,
    quantityUnit: row.quantityUnit,
    daysSupply: row.daysSupply,
    startDate: row.startDate,
    endDate: row.endDate ?? undefined,
    diagnoses: JSON.parse(row.diagnoses),
    status: row.status as Medication['status'],
    patientId: row.patientId,
    writtenDate: row.writtenDate,
  };
}

export function getAllMedications(): Medication[] {
  const stmt = db.prepare('SELECT * FROM medications ORDER BY writtenDate DESC');
  const rows = stmt.all() as MedicationRow[];
  return rows.map(rowToMedication);
}

export function getMedicationById(id: string): Medication | null {
  const stmt = db.prepare('SELECT * FROM medications WHERE id = ?');
  const row = stmt.get(id) as MedicationRow | undefined;
  return row ? rowToMedication(row) : null;
}

export function insertMedication(medication: Medication): void {
  const stmt = db.prepare(`
    INSERT INTO medications (id, prescriber, drug, dosingInstructions, quantity, quantityUnit, daysSupply, startDate, endDate, diagnoses, status, patientId, writtenDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    medication.id,
    JSON.stringify(medication.prescriber),
    JSON.stringify(medication.drug),
    medication.dosingInstructions,
    medication.quantity,
    medication.quantityUnit,
    medication.daysSupply,
    medication.startDate,
    medication.endDate ?? null,
    JSON.stringify(medication.diagnoses),
    medication.status,
    medication.patientId,
    medication.writtenDate
  );
}

export function updateMedication(id: string, medication: Partial<Medication>): void {
  const existing = getMedicationById(id);
  if (!existing) return;

  const updated = { ...existing, ...medication };
  const stmt = db.prepare(`
    UPDATE medications
    SET prescriber = ?, drug = ?, dosingInstructions = ?, quantity = ?, quantityUnit = ?,
        daysSupply = ?, startDate = ?, endDate = ?, diagnoses = ?, status = ?, patientId = ?, writtenDate = ?
    WHERE id = ?
  `);
  stmt.run(
    JSON.stringify(updated.prescriber),
    JSON.stringify(updated.drug),
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

export function deleteMedication(id: string): boolean {
  const stmt = db.prepare('DELETE FROM medications WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}
