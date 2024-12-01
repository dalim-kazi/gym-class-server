import { sendResponse } from '@/libs/response';
import {
    deleteUserService,
    getAllUserService,
    getDSingleUserService,
    loginUserService,
    registerUserService,
    updateUserService
} from '@/services/auth.service';
import { NextFunction, Request, Response } from 'express';

// Register User
export const registerUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { fullName, email, password, role } = req.body;
        const result = await registerUserService(fullName, email, password, role);
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: result.id, email: result.email, role: result.role },
            token: result.token
        });
    } catch (error: any) {
        next(error);
    }
};

// Login User
export const loginUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;
        const result = await loginUserService(email, password);
        res.status(200).json({
            message: 'Login successful',
            user: { id: result.id, email: result.email, role: result.role },
            token: result.token
        });
    } catch (error: any) {
        next(error);
    }
};
// get all user
export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = req.query;
        const usersData = await getAllUserService(role as string);
        res.status(200).json({
            isSuccess: true,
            message: usersData.message,
            data: usersData.response
        });
    } catch (error) {
        next(error);
    }
};

//delete user
export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const response = await deleteUserService(id);
        sendResponse.deleteRes(res, response, 'User');
    } catch (error) {
        next(error);
    }
};

//update
export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const data = req.body;
        const response = await updateUserService(id, data);
        sendResponse.update(res, response, 'User');
    } catch (error) {
        next(error);
    }
};

//get single user
export const getSingleUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const response = await getDSingleUserService(id);
        sendResponse.get(res, response, 'User');
    } catch (error) {
        next(error);
    }
};
