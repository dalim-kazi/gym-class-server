import { loginUserController, registerUserController } from '@/controllers/auth.controller';
import validateRequest from '@/middlewares/validateRequest';
import { loginValidationSchema, userValidationSchema } from '@/schemas/users.schema';
import { Router } from 'express';

const authRouter = Router();

// Registration and Login Routes
authRouter.route('/register').post(validateRequest(userValidationSchema), registerUserController);
authRouter.route('/login').post(validateRequest(loginValidationSchema),loginUserController);

export default authRouter;
