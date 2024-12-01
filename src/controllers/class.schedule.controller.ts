import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '@/libs/response'; // Custom response utility
import {
    createClassScheduleService,
    deleteClassScheduleService,
    getByIdClassScheduleService,
    getClassScheduleService,
    updateClassScheduleService
} from '@/services/class.schedule.service';

// Controller to create a new class schedule
export const createClassScheduleController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { className, trainer, day, maxTrainees } = req.body;
        const classSchedule = await createClassScheduleService(
            className,
            trainer,
            new Date(day),
            maxTrainees
        );
        sendResponse.post(res, 'Class Schedule', classSchedule);
    } catch (error) {
        next(error);
    }
};

// Controller to update an existing class schedule
export const updateClassScheduleController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id as string; // Getting class schedule ID from URL
        const { className, trainer, day, maxTrainees } = req.body;
        const updatedClassSchedule = await updateClassScheduleService(
            id,
            className,
            trainer,
            new Date(day),
            maxTrainees
        );
        sendResponse.update(res, updatedClassSchedule, 'Class Schedule');
    } catch (error) {
        next(error);
    }
};

// Controller to delete a class schedule
export const deleteClassScheduleController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id as string;
        const response = await deleteClassScheduleService(id);
        sendResponse.deleteRes(res, response, 'Class Schedule');
    } catch (error) {
        next(error);
    }
};

//get by id
export const getByIdClassScheduleController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id as string;
        const response = await getByIdClassScheduleService(id);
        sendResponse.get(res, response, 'Class Schedule');
    } catch (error) {
        next(error);
    }
};

// Controller to get all class schedules
export const getClassSchedulesController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { page, limit } = req.query;
        const trainerId = req.query.trainerId as string;
        const pageNumber = parseInt(page as string, 10) || 1;
        const pageSize = parseInt(limit as string, 10) || 10;
        const { bookings, pagination } = await getClassScheduleService(
            pageNumber,
            pageSize,
            trainerId
        );
        sendResponse.get(res, bookings, 'Class Schedules', pagination);
    } catch (error) {
        next(error);
    }
};
