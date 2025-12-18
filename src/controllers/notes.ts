import { Router, Request, Response } from 'express';
import { NotesModel } from '../models';

const router = Router();

// GET /notes - Get all notes
router.get('/', (_req: Request, res: Response) => {
  const notes = NotesModel.getAll();
  res.json(notes);
});

// GET /notes/:id - Get a single note
router.get('/:id', (req: Request, res: Response) => {
  const note = NotesModel.getById(req.params.id);
  if (!note) {
    res.status(404).json({ error: 'Note not found' });
    return;
  }
  res.json(note);
});

export default router;
