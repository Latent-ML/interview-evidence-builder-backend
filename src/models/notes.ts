import { Note } from '../types';
import * as notesDb from '../db/notes';

export function getAll(): Note[] {
  return notesDb.getAllNotes();
}

export function getById(id: string): Note | null {
  return notesDb.getNoteById(id);
}

export function create(note: Note): Note {
  notesDb.insertNote(note);
  return note;
}

export function update(id: string, updates: Partial<Note>): Note | null {
  const existing = notesDb.getNoteById(id);
  if (!existing) return null;
  
  notesDb.updateNote(id, updates);
  return notesDb.getNoteById(id);
}

export function remove(id: string): boolean {
  return notesDb.deleteNote(id);
}

