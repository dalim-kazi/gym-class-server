import {
    deleteUserController,
    getAllUsersController,
    getSingleUserController,
    loginUserController,
    registerUserController,
    updateUserController
} from '@/controllers/auth.controller';
import { authenticate } from '@/middlewares/authorization';
import validateRequest from '@/middlewares/validateRequest';
import { loginValidationSchema, userValidationSchema } from '@/schemas/users.schema';
import { Router } from 'express';

const authRouter = Router();

// Registration and Login Routes
authRouter.route('/register').post(validateRequest(userValidationSchema), registerUserController);
authRouter.route('/login').post(validateRequest(loginValidationSchema), loginUserController);
authRouter.route('/get-all-user').get(authenticate(['admin']), getAllUsersController);
authRouter.route('/update-user/:id').patch(authenticate(['admin']), updateUserController);
authRouter.route('/delete-user/:id').delete(authenticate(['admin']), deleteUserController);
authRouter.route('/single-user/:id').get(authenticate(['admin']), getSingleUserController);
export default authRouter;
