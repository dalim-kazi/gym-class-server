import express from 'express';
import { authenticate } from '@/middlewares/authorization';
import { createClassScheduleController, deleteClassScheduleController, getByIdClassScheduleController, getClassSchedulesController, updateClassScheduleController } from '@/controllers/class.schedule.controller';

const classScheduleRouter = express.Router();

// Route to create a new trainer
classScheduleRouter.route('/')
.post(authenticate(['admin']),createClassScheduleController)
.get(getClassSchedulesController);

// Route to get a trainer by ID
classScheduleRouter.route('/:id')
.get(authenticate(['admin']),getByIdClassScheduleController)
.patch(authenticate(['admin']),updateClassScheduleController)
.delete(authenticate(['admin']),deleteClassScheduleController);

export default classScheduleRouter;
