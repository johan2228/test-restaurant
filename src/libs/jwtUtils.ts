import { sign, verify } from 'jsonwebtoken';

// Secret key used for signing and verifying tokens
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Function to generate a JWT token for a given userId
export const generateToken = (userId: number): string => {
  // Sign the token with userId payload, using JWT_SECRET with 1-hour expiration
  return sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify and decode a JWT token
export const verifyToken = (token: string): any => {
  try {
    // Verify the token using JWT_SECRET and return decoded payload
    return verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
