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
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized', errorDetails: 'Token is missing' });
    }

    try {
      const decoded = verifyToken(token) as IUser;
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden',
          errorDetails: 'You do not have the required role to access this resource',
        });
      }

      next();
    } catch (error:any) {
      return res.status(401).json({ success: false, message: 'Invalid token', errorDetails: error.message });
    }
  };
};
