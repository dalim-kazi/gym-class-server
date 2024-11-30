import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  [key: string]: any;
}

// Function to generate a JWT token
export const generateToken = (payload: TokenPayload, expiresIn: string | number = '1h'): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Function to verify a JWT token
export const verifyToken = (token: string): TokenPayload => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }
  return jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
};
