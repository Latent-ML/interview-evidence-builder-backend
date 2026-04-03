import Database, { Database as DatabaseType } from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'evidence-builder.db');

export const db: DatabaseType = new Database(DB_PATH);

// Enable foreign keys
db.pragma('journal_mode = WAL');

export function initializeDatabase() {
  // Notes table
  db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      author TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      patientId TEXT NOT NULL,
      encounterId TEXT
    )
  `);

  // Labs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS labs (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      code TEXT,
      value TEXT NOT NULL,
      unit TEXT NOT NULL,
      referenceRange TEXT,
      date TEXT NOT NULL,
      status TEXT NOT NULL,
      patientId TEXT NOT NULL
    )
  `);

  // Medications table
  db.exec(`
    CREATE TABLE IF NOT EXISTS medications (
      id TEXT PRIMARY KEY,
      prescriber TEXT NOT NULL,
      drug TEXT NOT NULL,
      dosingInstructions TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      quantityUnit TEXT NOT NULL,
      daysSupply INTEGER NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT,
      diagnoses TEXT NOT NULL,
      status TEXT NOT NULL,
      patientId TEXT NOT NULL,
      writtenDate TEXT NOT NULL
    )
  `);

  // Evidence documents table
  db.exec(`
    CREATE TABLE IF NOT EXISTS evidence_docs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      sections TEXT NOT NULL,
      patientId TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      createdBy TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `);

  console.log('📦 Database initialized');
}

export function closeDatabase() {
  db.close();
}

