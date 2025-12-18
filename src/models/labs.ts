import { Lab } from '../types';
import * as labsDb from '../db/labs';

export function getAll(): Lab[] {
  return labsDb.getAllLabs();
}

export function getById(id: string): Lab | null {
  return labsDb.getLabById(id);
}

export function create(lab: Lab): Lab {
  labsDb.insertLab(lab);
  return lab;
}

export function update(id: string, updates: Partial<Lab>): Lab | null {
  const existing = labsDb.getLabById(id);
  if (!existing) return null;
  
  labsDb.updateLab(id, updates);
  return labsDb.getLabById(id);
}

export function remove(id: string): boolean {
  return labsDb.deleteLab(id);
}

