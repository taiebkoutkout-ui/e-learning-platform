import { Router, Request, Response } from 'express';
import { authMiddleware, professorOnly } from '../middleware/auth.js';

const router = Router();

// Mock course storage
const courses: any[] = [];

// Get all courses
router.get('/', async (req: Request, res: Response) => {
  res.json(courses);
});

// Get course by ID
router.get('/:id', async (req: Request, res: Response) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ message: 'Cours non trouvé' });
  }
  res.json(course);
});

// Create course (professors only)
router.post('/', authMiddleware, professorOnly, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const newCourse = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      instructorId: req.user?.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    courses.push(newCourse);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du cours' });
  }
});

// Update course
router.put('/:id', authMiddleware, professorOnly, async (req: Request, res: Response) => {
  try {
    const course = courses.find(c => c.id === req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    if (course.instructorId !== req.user?.userId) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    Object.assign(course, req.body, { updatedAt: new Date() });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification du cours' });
  }
});

// Delete course
router.delete('/:id', authMiddleware, professorOnly, async (req: Request, res: Response) => {
  try {
    const index = courses.findIndex(c => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    const course = courses[index];
    if (course.instructorId !== req.user?.userId) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    courses.splice(index, 1);
    res.json({ message: 'Cours supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du cours' });
  }
});

export default router;
