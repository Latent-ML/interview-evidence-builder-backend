import { db } from './connection';
import { EvidenceDoc, EvidenceSection } from '../types';

interface EvidenceDocRow {
  id: string;
  title: string;
  description: string | null;
  sections: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: string;
}

function rowToEvidenceDoc(row: EvidenceDocRow): EvidenceDoc {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    sections: JSON.parse(row.sections) as EvidenceSection[],
    patientId: row.patientId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    createdBy: row.createdBy,
    status: row.status as EvidenceDoc['status'],
  };
}

export function getAllEvidenceDocs(): EvidenceDoc[] {
  const stmt = db.prepare('SELECT * FROM evidence_docs ORDER BY updatedAt DESC');
  const rows = stmt.all() as EvidenceDocRow[];
  return rows.map(rowToEvidenceDoc);
}

export function getEvidenceDocById(id: string): EvidenceDoc | null {
  const stmt = db.prepare('SELECT * FROM evidence_docs WHERE id = ?');
  const row = stmt.get(id) as EvidenceDocRow | undefined;
  return row ? rowToEvidenceDoc(row) : null;
}

export function insertEvidenceDoc(doc: EvidenceDoc): void {
  const stmt = db.prepare(`
    INSERT INTO evidence_docs (id, title, description, sections, patientId, createdAt, updatedAt, createdBy, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    doc.id,
    doc.title,
    doc.description ?? null,
    JSON.stringify(doc.sections),
    doc.patientId,
    doc.createdAt,
    doc.updatedAt,
    doc.createdBy,
    doc.status
  );
}

export function updateEvidenceDoc(id: string, updates: Partial<EvidenceDoc>): EvidenceDoc | null {
  const existing = getEvidenceDocById(id);
  if (!existing) return null;

  const updated: EvidenceDoc = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  const stmt = db.prepare(`
    UPDATE evidence_docs 
    SET title = ?, description = ?, sections = ?, status = ?, updatedAt = ?
    WHERE id = ?
  `);
  stmt.run(
    updated.title,
    updated.description ?? null,
    JSON.stringify(updated.sections),
    updated.status,
    updated.updatedAt,
    id
  );

  return updated;
}

export function deleteEvidenceDoc(id: string): EvidenceDoc | null {
  const existing = getEvidenceDocById(id);
  if (!existing) return null;

  const stmt = db.prepare('DELETE FROM evidence_docs WHERE id = ?');
  stmt.run(id);
  return existing;
}

