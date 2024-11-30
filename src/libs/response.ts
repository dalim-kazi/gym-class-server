import { IPaginatedResponse, IPagination, IResponse } from '@/types/response';
import { Response } from 'express';
import { CustomError } from './customError';

// Success Responses
const post = <T>(res: Response, messageTitle: string, data: T) => {
    const response: IResponse<T> = {
        isSuccess: true,
        statusCode: 201,
        message: `${messageTitle} created successfully`,
        data: data
    };

    return res.status(201).json(response);
};

const get = <T>(res: Response, data: T, messageTitle?: string, pagination?: IPagination) => {
    const response: IPaginatedResponse<T> = {
        isSuccess: true,
        statusCode: 200,
        message: messageTitle
            ? `${messageTitle} fetched successfully`
            : 'Data fetched successfully',
        ...(pagination && { pagination }), // Adding pagination details if provided
        data: data
    };

    return res.status(200).json(response);
};

const update = <T>(res: Response, data: T, messageTitle?: string) => {
    const response: IResponse<T> = {
        isSuccess: true,
        statusCode: 200,
        message: `${messageTitle} updated successfully`,
        data: data
    };

    return res.status(200).json(response);
};

const deleteRes = <T>(res: Response, data: T, messageTitle?: string) => {
    const response: IResponse<T> = {
        isSuccess: true,
        statusCode: 200,
        message: `${messageTitle} deleted successfully`,
        data: data
    };

    return res.status(200).json(response);
};

// Error Responses

const validationError = (field: string, message: string) => {
    return {
        success: false,
        message: 'Validation error occurred.',
        errorDetails: {
            field: field,
            message: message
        }
    };
};

const unauthorizedAccess = (message: string) => {
    return {
        success: false,
        message: 'Unauthorized access.',
        errorDetails: message
    };
};

const bookingLimitExceeded = () => {
    return {
        success: false,
        message: 'Class schedule is full. Maximum 10 trainees allowed per schedule.',
        errorDetails: null
    };
};

const notFound = (messageTitle = 'Resources') => {
    throw new CustomError(`${messageTitle} Not Found`, 404);
};

const duplicate = (messageTitle = 'Resources') => {
    throw new CustomError(`${messageTitle} Already exists!`, 400);
};

const invalidObjectId = (messageTitle?: string) => {
    throw new CustomError(`Invalid ${messageTitle} Id`, 400);
};

// Catch and rethrow errors
const throwError = (error: any) => {
    // Re-throw the original CustomError
    if (error instanceof CustomError) {
        throw error;
    }
    // Wrap non-CustomError in a new CustomError
    throw new CustomError(error.message || 'Unknown Error', error.status || 500);
};

// Not found response (for external API calls or requests that need to respond with 404)
const sendNotFoundResponse = (res: Response, messageTitle = 'Resource') => {
    res.status(404).json({
        success: false,
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
    validationError,
    unauthorizedAccess,
    bookingLimitExceeded,
    notFound,
    duplicate,
    invalidObjectId,
    throwError
};
