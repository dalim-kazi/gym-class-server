import { sendError } from '@/libs/response';
import User, { IUser } from '@/models/auth.model';
import { deleteByIdService, getByIdService, updateByIdService } from '@/utils/findById.service';
import { generateToken } from '@/utils/jwt.helper';

export const registerUserService = async (
    fullName: string,
    email: string,
    password: string,
    role: string
) => {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        sendError.duplicate('Email');
    }
    // Create a new user
    const user = await User.create({ fullName, email, password, role });
    // Generate a JWT token
    const token = generateToken({ id: user._id, role: user.role });
    return {
        id: user._id,
        email: user.email,
        role: user.role,
        token
    };
};

export const loginUserService = async (email: string, password: string) => {
    // Check if email and password are provided
    if (!email || !password) {
        sendError.notFound('Email and password are required');
    }
    // Find the user by email
    const user = (await User.findOne({ email })) as IUser;
    if (!user) {
        sendError.notFound('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        sendError.notFound('Invalid email or password');
    }

    // Generate a JWT token
    const token = generateToken({ id: user._id, role: user.role });
    // Return the user data and token
    return {
        id: user._id,
        email: user.email,
        role: user.role,
        token
    };
};

export const getAllUserService = async (role: string) => {
    let query: any = {};
    if (role) {
        query.role = role;
    }
    const response = await User.find(query).select('-password');
    return {
        isSuccess: true,
        response: response,
        message: response.length ? 'Users fetched successfully' : 'No users found'
    };
};

export const deleteUserService = async (id: string) => {
    return await deleteByIdService(id, User, 'User');
};

export const updateUserService = async (id: string, data: any) => {
    return await updateByIdService(id, User, data, 'User');
};

//get single
export const getDSingleUserService = async (id: string) => {
    return await getByIdService(id, User, 'User');
};
