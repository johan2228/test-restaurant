import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (userId: number): string => {
  return sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
