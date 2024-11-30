import { sendError } from '@/libs/response';
import { Model } from 'mongoose';

export const getByIdService = async <T>(id: string, model: Model<T>, messageTitle?: string) => {
    try {
        const response: T = (await model.findById(id)) as T;
        if (!response) sendError.notFound(messageTitle);

        return response;
    } catch (error: any) {
        sendError.throwError(error);
    }
};

export const updateByIdService = async <T extends object>(
    id: string,
    model: Model<T>,
    data: T,
    messageTitle?: string
) => {
    try {
        const response: T = (await model.findByIdAndUpdate(id, { $set: data }, { new: true })) as T;
        if (!response) sendError.notFound(messageTitle);

        return response;
    } catch (error: any) {
        sendError.throwError(error);
    }
};

export const deleteByIdService = async <T>(id: string, model: Model<T>, messageTitle?: string) => {
    try {
        const response: T = (await model.findByIdAndDelete(id)) as T;

        if (!response) sendError.notFound(messageTitle);

        return response;
    } catch (error: any) {
        sendError.throwError(error);
    }
};

