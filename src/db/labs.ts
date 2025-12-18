import { db } from './connection';
import { Lab } from '../types';

interface LabRow {
  id: string;
  type: string;
  code: string | null;
  value: string;
  unit: string;
  referenceRange: string | null;
  date: string;
  status: string;
  patientId: string;
}

function rowToLab(row: LabRow): Lab {
  return {
    id: row.id,
    type: row.type,
    code: row.code ?? undefined,
    value: isNaN(Number(row.value)) ? row.value : Number(row.value),
    unit: row.unit,
    referenceRange: row.referenceRange ? JSON.parse(row.referenceRange) : undefined,
    date: row.date,
    status: row.status as Lab['status'],
    patientId: row.patientId,
  };
}

export function getAllLabs(): Lab[] {
  const stmt = db.prepare('SELECT * FROM labs ORDER BY date DESC');
  const rows = stmt.all() as LabRow[];
  return rows.map(rowToLab);
}

export function getLabById(id: string): Lab | null {
  const stmt = db.prepare('SELECT * FROM labs WHERE id = ?');
  const row = stmt.get(id) as LabRow | undefined;
  return row ? rowToLab(row) : null;
}

export function insertLab(lab: Lab): void {
  const stmt = db.prepare(`
    INSERT INTO labs (id, type, code, value, unit, referenceRange, date, status, patientId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    lab.id,
    lab.type,
    lab.code ?? null,
    String(lab.value),
    lab.unit,
    lab.referenceRange ? JSON.stringify(lab.referenceRange) : null,
    lab.date,
    lab.status,
    lab.patientId
  );
}

export function updateLab(id: string, lab: Partial<Lab>): void {
  const existing = getLabById(id);
  if (!existing) return;

  const updated = { ...existing, ...lab };
  const stmt = db.prepare(`
    UPDATE labs 
    SET type = ?, code = ?, value = ?, unit = ?, referenceRange = ?, date = ?, status = ?, patientId = ?
    WHERE id = ?
  `);
  stmt.run(
    updated.type,
    updated.code ?? null,
    String(updated.value),
    updated.unit,
    updated.referenceRange ? JSON.stringify(updated.referenceRange) : null,
    updated.date,
    updated.status,
    updated.patientId,
    id
  );
}

export function deleteLab(id: string): boolean {
  const stmt = db.prepare('DELETE FROM labs WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

