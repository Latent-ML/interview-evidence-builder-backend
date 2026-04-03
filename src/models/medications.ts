import { Medication } from '../types';
import * as medicationsDb from '../db/medications';

export function getAll(): Medication[] {
  return medicationsDb.getAllMedications();
}

export function getById(id: string): Medication | null {
  return medicationsDb.getMedicationById(id);
}

export function create(medication: Medication): Medication {
  medicationsDb.insertMedication(medication);
  return medication;
}

export function update(id: string, updates: Partial<Medication>): Medication | null {
  const existing = medicationsDb.getMedicationById(id);
  if (!existing) return null;

  medicationsDb.updateMedication(id, updates);
  return medicationsDb.getMedicationById(id);
}

export function remove(id: string): boolean {
  return medicationsDb.deleteMedication(id);
}
