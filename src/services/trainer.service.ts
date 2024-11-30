
import { IPaginatedResponse, IPagination } from '@/types/response';
import Trainer, { ITrainer } from '../models/trainer.model';
import { sendError } from '@/libs/response';

// Create a Trainer
export const createNewTrainer = async (data: {
  name: string;
  email: string;
  phone: string;
  specialization: string;
}): Promise<ITrainer> => {
  const existingTrainer = await Trainer.findOne({ email: data.email });
  if (existingTrainer) {
    sendError.notFound('Trainer with this email already exists');
  }
  return await Trainer.create(data);
};

//get by id
export const getByIdService = async <T>(id: string) => {
    try {
        const response: T = (await Trainer.findById(id)) as T;
        if (!response) sendError.notFound("Trainer");
        return response;
    } catch (error: any) {
        sendError.throwError(error);
    }
};

//update
export const updateByIdService = async <T extends object>(
    id: string,
    data: T,
) => {
    try {
        const response: T = (await Trainer.findByIdAndUpdate(id, { $set: data }, { new: true })) as T;
        if (!response) sendError.notFound("Trainer");
        return response;
    } catch (error: any) {
        sendError.throwError(error);
    }
};
//delete
export const deleteByIdService = async <T>(id: string) => {
    try {
        const response: T = (await Trainer.findByIdAndDelete(id)) as T;
        if (!response) sendError.notFound("Trainer");
        return response;
    } catch (error: any) {
        sendError.throwError(error);
    }
};

//get all
export const getAllWithPaginationService = async (
    page: number = 1,
    limit: number = 10
  ): Promise<IPaginatedResponse<ITrainer[]>> => {
    const skip = (page - 1) * limit;
    const totalItemCount = await Trainer.countDocuments();
    const trainers = await Trainer.find().skip(skip).limit(limit);
  
    const pagination: IPagination = {
      currentPage: page,
      totalPages: Math.ceil(totalItemCount / limit),
      pageSize: trainers.length,
      nextPage: page < Math.ceil(totalItemCount / limit) ? page + 1 : null,
      itemCount: trainers.length,
      totalItemCount,
    };
  
    return {
      isSuccess: true,
      message: 'Trainers fetched successfully',
      pagination,
      data: trainers,
    };
  };

