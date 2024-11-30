import { IUser } from '@/models/auth.model';
import { verifyToken } from '@/utils/jwt.helper';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
       res.status(401).json({
        success: false,
        message: 'Unauthorized',
        errorDetails: 'Token is missing',
      });
      return
    }

    try {
      const decoded = verifyToken(token) as IUser;
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
         res.status(403).json({
          success: false,
          message: 'Forbidden',
          errorDetails: 'You do not have the required role to access this resource',
        });
        return
      }

      next(); 
    } catch (error: any) {
     res.status(401).json({
        success: false,
        message: 'Invalid token',
        errorDetails: error.message,
      });
      return
    }
  };
};
