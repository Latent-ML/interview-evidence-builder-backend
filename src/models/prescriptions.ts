import { Prescription } from '../types';
import * as prescriptionsDb from '../db/prescriptions';

export function getAll(): Prescription[] {
  return prescriptionsDb.getAllPrescriptions();
}

export function getById(id: string): Prescription | null {
  return prescriptionsDb.getPrescriptionById(id);
}

export function create(prescription: Prescription): Prescription {
  prescriptionsDb.insertPrescription(prescription);
  return prescription;
}

export function update(id: string, updates: Partial<Prescription>): Prescription | null {
  const existing = prescriptionsDb.getPrescriptionById(id);
  if (!existing) return null;
  
  prescriptionsDb.updatePrescription(id, updates);
  return prescriptionsDb.getPrescriptionById(id);
}

export function remove(id: string): boolean {
  return prescriptionsDb.deletePrescription(id);
}

