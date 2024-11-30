import { NextFunction, Request, Response } from 'express';
import {
  createNewTrainer,
  getByIdService,
  updateByIdService,
  deleteByIdService,
  getAllWithPaginationService,
} from '@/services/trainer.service';
import { ITrainer } from '@/models/trainer.model';
import { sendError } from '@/libs/response';

// Create a new trainer
export const createTrainerController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const { name, email, phone, specialization } = req.body;
    const trainer = await createNewTrainer({ name, email, phone, specialization });
    res.status(201).json({
      isSuccess: true,
      message: 'Trainer created successfully',
      data: trainer,
    });
  } catch (error: any) {
    sendError.throwError(error);
  }
};

// Get a trainer by ID
export const getTrainerByIdController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const  id = req.params.id as string;
    const trainer = await getByIdService<ITrainer>(id);
    res.status(200).json({
      isSuccess: true,
      message: 'Trainer fetched successfully',
      data: trainer,
    });
  } catch (error: any) {
    sendError.throwError(error);
  }
};

// Update a trainer by ID
export const updateTrainerController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const  id  = req.params.id as string;
    const trainerData = req.body;
    const updatedTrainer = await updateByIdService<ITrainer>(id, trainerData);
    res.status(200).json({
      isSuccess: true,
      message: 'Trainer updated successfully',
      data: updatedTrainer,
    });
  } catch (error: any) {
    sendError.throwError(error);
  }
};

// Delete a trainer by ID
export const deleteTrainerController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const  id = req.params.id as string;
    await deleteByIdService<ITrainer>(id);
    res.status(200).json({
      isSuccess: true,
      message: 'Trainer deleted successfully',
    });
  } catch (error: any) {
    sendError.throwError(error);
  }
};

// Get all trainers with pagination
export const getAllTrainersController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const { page, limit } = req.query;
    const paginationPage = page ? parseInt(page as string, 10) : 1;
    const paginationLimit = limit ? parseInt(limit as string, 10) : 10;
    const response = await getAllWithPaginationService(paginationPage, paginationLimit);
    res.status(200).json(response);
  } catch (error: any) {
    sendError.throwError(error);
  }
};
