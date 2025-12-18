import { Router, Request, Response } from 'express';
import { PrescriptionsModel } from '../models';

const router = Router();

// GET /prescriptions - Get all prescriptions
router.get('/', (_req: Request, res: Response) => {
  const prescriptions = PrescriptionsModel.getAll();
  res.json(prescriptions);
});

// GET /prescriptions/:id - Get a single prescription
router.get('/:id', (req: Request, res: Response) => {
  const prescription = PrescriptionsModel.getById(req.params.id);
  if (!prescription) {
    res.status(404).json({ error: 'Prescription not found' });
    return;
  }
  res.json(prescription);
});

export default router;
