import { Router, Request, Response } from 'express';
import { LabsModel } from '../models';

const router = Router();

// GET /labs - Get all labs
router.get('/', (_req: Request, res: Response) => {
  const labs = LabsModel.getAll();
  res.json(labs);
});

// GET /labs/:id - Get a single lab
router.get('/:id', (req: Request, res: Response) => {
  const lab = LabsModel.getById(req.params.id);
  if (!lab) {
    res.status(404).json({ error: 'Lab not found' });
    return;
  }
  res.json(lab);
});

export default router;
