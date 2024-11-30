import { sendError } from "@/libs/response";
import User, { IUser } from "@/models/auth.model";
import { generateToken } from "@/utils/jwt.helper";

export const registerUserService = async (fullName: string, email: string, password: string) => {
  // Check if the email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    sendError.duplicate('Email');
  }
  // Create a new user
  const user = await User.create({ fullName, email, password });
  // Generate a JWT token
  const token = generateToken({ id: user._id, role: user.role });
  return {
    id: user._id,
    email: user.email,
    role: user.role,
    token,
  };
};

export const loginUserService = async (email: string, password: string) => {
    // Check if email and password are provided
    if (!email || !password) {
      sendError.notFound("Email and password are required");
    }
    // Find the user by email
    const user = await User.findOne({ email }) as IUser;
    if (!user) {
      sendError.notFound("Invalid email or password");
    }
  
    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      sendError.notFound("Invalid email or password");
    }
  
    // Generate a JWT token
    const token = generateToken({ id: user._id, role: user.role });
    // Return the user data and token
    return {
      id: user._id,
      email: user.email,
      role: user.role,
      token,
    };
  };
