import { IPaginatedResponse, IPagination, IResponse } from '@/types/response';
import { Response } from 'express';
import { CustomError } from './customError';

const post = <T>(res: Response, messageTitle: string, data: T) => {
    const response: IResponse<T> = {
        isSuccess: true,
        message: `${messageTitle} created successfully`,
        data: data
    };

    return res.status(201).json(response);
};

const get = <T>(res: Response, data: T, messageTitle?: string, pagination?: IPagination) => {
    const response: IPaginatedResponse<T> = {
        isSuccess: true,
        message: messageTitle
            ? `${messageTitle} fetched successfully`
            : 'Data fetched successfully',
        ...(pagination && { pagination }),
        data: data
    };

    return res.status(200).json(response);
};

const update = <T>(res: Response, data: T, messageTitle?: string) => {
    const response: IPaginatedResponse<T> = {
        isSuccess: true,
        message: `${messageTitle} updated successfully`,
        data: data
    };

    return res.status(200).json(response);
};

const deleteRes = <T>(res: Response, data: T, messageTitle?: string) => {
    const response: IPaginatedResponse<T> = {
        isSuccess: true,
        message: `${messageTitle} deleted successfully`,
        data: data
    };

    return res.status(200).json(response);
};

/***
 * Error Responses
 ***/
const notFound = (messageTitle = 'Resources') => {
    throw new CustomError(`${messageTitle} Not Found`, 404);
};

const duplicate = (messageTitle = 'Resources') => {
    throw new CustomError(`${messageTitle} Already exists!`, 400);
};

const invalidObjectId = (messageTitle?: string) => {
    throw new CustomError(`Invalid ${messageTitle} Id`, 400);
};

// If need to throw error from one catch block to another
const throwError = (error: any) => {
    // Re-throw the original CustomError
    if (error instanceof CustomError) {
        throw error;
    }
    // Wrap non-CustomError in a new CustomError
    throw new CustomError(error.message || 'Unknown Error', error.status || 500);
};

const sendNotFoundResponse = (res: Response, messageTitle = 'Resource') => {
    res.status(404).json({
        isSuccess: false,
        message: `${messageTitle} Not Found`
    });
};

export const sendResponse = {
    post,
    get,
    update,
    deleteRes,
    sendNotFoundResponse
};

export const sendError = {
    notFound,
    duplicate,
    invalidObjectId,
    throwError
};
