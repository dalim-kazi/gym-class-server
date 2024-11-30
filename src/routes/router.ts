import { Router } from 'express';
import authRouter from './auth.routes';
import trainerRouter from './trainer.routes';
const router = Router();

// Routes
router.use('/auth', authRouter);
router.use('/trainer', trainerRouter);

export default router;
