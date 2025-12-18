import { Router, Request, Response } from 'express';
import { EvidenceDocsModel } from '../models';
import { CreateEvidenceDocRequest, UpdateEvidenceDocRequest } from '../types';

const router = Router();

// GET /evidence-docs - Get all evidence documents
router.get('/', (_req: Request, res: Response) => {
  const docs = EvidenceDocsModel.getAll();
  res.json(docs);
});

// GET /evidence-docs/:id - Get a single evidence document
router.get('/:id', (req: Request, res: Response) => {
  const doc = EvidenceDocsModel.getById(req.params.id);
  if (!doc) {
    res.status(404).json({ error: 'Evidence document not found' });
    return;
  }
  res.json(doc);
});

// POST /evidence-docs - Create a new evidence document
router.post('/', (req: Request, res: Response) => {
  const body = req.body as CreateEvidenceDocRequest;

  // Basic validation
  if (!body.title || !body.sections || !body.patientId || !body.createdBy) {
    res.status(400).json({
      error: 'Missing required fields: title, sections, patientId, and createdBy are required',
    });
    return;
  }

  const newDoc = EvidenceDocsModel.create(body);
  res.status(201).json(newDoc);
});

// PUT /evidence-docs/:id - Update an evidence document
router.put('/:id', (req: Request, res: Response) => {
  const body = req.body as UpdateEvidenceDocRequest;
  const updatedDoc = EvidenceDocsModel.update(req.params.id, body);
  
  if (!updatedDoc) {
    res.status(404).json({ error: 'Evidence document not found' });
    return;
  }
  
  res.json(updatedDoc);
});

// DELETE /evidence-docs/:id - Delete an evidence document
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = EvidenceDocsModel.remove(req.params.id);
  
  if (!deleted) {
    res.status(404).json({ error: 'Evidence document not found' });
    return;
  }
  
  res.json({ message: 'Evidence document deleted', doc: deleted });
});

export default router;
