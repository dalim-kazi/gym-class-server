import express from 'express';
import {
  createTrainerController,
  getTrainerByIdController,
  updateTrainerController,
  deleteTrainerController,
  getAllTrainersController,
} from '@/controllers/trainer.controller';

const trainerRouter = express.Router();

// Route to create a new trainer
trainerRouter.route('/')
.post(createTrainerController)
.get(getAllTrainersController);

// Route to get a trainer by ID
trainerRouter.route('/:id')
.get(getTrainerByIdController)
.patch(updateTrainerController)
.delete(deleteTrainerController);

export default trainerRouter;
