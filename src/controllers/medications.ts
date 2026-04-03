import { Router, Request, Response } from 'express';
import { MedicationsModel } from '../models';

const router = Router();

// GET /medications - Get all medications
router.get('/', (_req: Request, res: Response) => {
  const medications = MedicationsModel.getAll();
  res.json(medications);
});

// GET /medications/:id - Get a single medication
router.get('/:id', (req: Request, res: Response) => {
  const medication = MedicationsModel.getById(req.params.id);
  if (!medication) {
    res.status(404).json({ error: 'Medication not found' });
    return;
  }
  res.json(medication);
});

export default router;
