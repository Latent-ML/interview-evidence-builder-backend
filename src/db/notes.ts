import { db } from './connection';
import { Note } from '../types';

interface NoteRow {
  id: string;
  author: string;
  type: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  patientId: string;
  encounterId: string | null;
}

function rowToNote(row: NoteRow): Note {
  return {
    id: row.id,
    author: JSON.parse(row.author),
    type: row.type as Note['type'],
    title: row.title,
    content: row.content,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    patientId: row.patientId,
    encounterId: row.encounterId ?? undefined,
  };
}

export function getAllNotes(): Note[] {
  const stmt = db.prepare('SELECT * FROM notes ORDER BY createdAt DESC');
  const rows = stmt.all() as NoteRow[];
  return rows.map(rowToNote);
}

export function getNoteById(id: string): Note | null {
  const stmt = db.prepare('SELECT * FROM notes WHERE id = ?');
  const row = stmt.get(id) as NoteRow | undefined;
  return row ? rowToNote(row) : null;
}

export function insertNote(note: Note): void {
  const stmt = db.prepare(`
    INSERT INTO notes (id, author, type, title, content, createdAt, updatedAt, patientId, encounterId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    note.id,
    JSON.stringify(note.author),
    note.type,
    note.title,
    note.content,
    note.createdAt,
    note.updatedAt,
    note.patientId,
    note.encounterId ?? null
  );
}

export function updateNote(id: string, note: Partial<Note>): void {
  const existing = getNoteById(id);
  if (!existing) return;

  const updated = { ...existing, ...note, updatedAt: new Date().toISOString() };
  const stmt = db.prepare(`
    UPDATE notes 
    SET author = ?, type = ?, title = ?, content = ?, updatedAt = ?, patientId = ?, encounterId = ?
    WHERE id = ?
  `);
  stmt.run(
    JSON.stringify(updated.author),
    updated.type,
    updated.title,
    updated.content,
    updated.updatedAt,
    updated.patientId,
    updated.encounterId ?? null,
    id
  );
}

export function deleteNote(id: string): boolean {
  const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

