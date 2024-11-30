import express from 'express';
import {
  createTrainerController,
  getTrainerByIdController,
  updateTrainerController,
  deleteTrainerController,
  getAllTrainersController,
} from '@/controllers/trainer.controller';
import { authenticate } from '@/middlewares/authorization';

const trainerRouter = express.Router();

// Route to create a new trainer
trainerRouter.route('/')
.post(authenticate(['admin']),createTrainerController)
.get(authenticate(['admin']),getAllTrainersController);

// Route to get a trainer by ID
trainerRouter.route('/:id')
.get(authenticate(['admin']),getTrainerByIdController)
.patch(authenticate(['admin']),updateTrainerController)
.delete(authenticate(['admin']),deleteTrainerController);

export default trainerRouter;
