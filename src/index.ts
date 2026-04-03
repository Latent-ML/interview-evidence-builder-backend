import express, { Request, Response } from 'express';
import cors from 'cors';
import { initializeDatabase } from './db';
import {
  notesRouter,
  labsRouter,
  medicationsRouter,
  evidenceDocsRouter,
} from './controllers';

const app = express();
const PORT = process.env.PORT || 3210;

// Initialize database
initializeDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount routers
app.use('/notes', notesRouter);
app.use('/labs', labsRouter);
app.use('/medications', medicationsRouter);
app.use('/evidence-docs', evidenceDocsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Evidence Builder API running at http://localhost:${PORT}`);
  console.log(`
Available endpoints:
  GET    /health              - Health check
  GET    /notes               - Get all notes
  GET    /notes/:id           - Get a single note
  GET    /labs                - Get all labs
  GET    /labs/:id            - Get a single lab
  GET    /medications         - Get all medications
  GET    /medications/:id     - Get a single medication
  GET    /evidence-docs       - Get all evidence documents
  GET    /evidence-docs/:id   - Get a single evidence document
  POST   /evidence-docs       - Create a new evidence document
  PUT    /evidence-docs/:id   - Update an evidence document
  DELETE /evidence-docs/:id   - Delete an evidence document
  `);
});
