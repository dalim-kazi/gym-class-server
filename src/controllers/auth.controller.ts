import { loginUserService, registerUserService } from '@/services/auth.service';
import { NextFunction, Request, Response } from 'express';

// Register User
export const registerUserController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;
    const result = await registerUserService(fullName, email, password);
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: result.id, email: result.email, role: result.role },
      token: result.token,
    });
  } catch (error: any) {
    next(error)
  }
};

// Login User
export const loginUserController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);
    res.status(200).json({
      message: 'Login successful',
      user: { id: result.id, email: result.email, role: result.role },
      token: result.token,
    });
  } catch (error: any) {
     next(error)
  }
};