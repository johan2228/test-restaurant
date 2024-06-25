import { APIGatewayAuthorizerResult, APIGatewayProxyHandler } from 'aws-lambda';
import { AWSResponse, hashPassword, comparePassword, generateToken, verifyToken } from '@libs/index';
import { policyDocument, denyPolicyDocument } from './types';
import { getUser, saveUser } from './service';

// Register Handler
export const register: APIGatewayProxyHandler = async (event) => {
  // Parse request body for user registration details
  const { name, email, password } = JSON.parse(event.body);

  try {

    // Hash password before saving
    const hashedPassword = await hashPassword(password);

    await saveUser(name, email, hashedPassword)

    // Successful registration response
    return AWSResponse(201, { message: 'User registered successfully' });
  } catch (error) {
    console.error('ERROR on register user =>', error);
    return AWSResponse(500, { message: 'Internal Server Error' });
  }
};

// Login Handler
export const login: APIGatewayProxyHandler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  try {

    // Find user by email
    const user = await getUser(email);

    // Validate user credentials
    if (!user || !(await comparePassword(password, user.password))) {
      return AWSResponse(401, { message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Successful login response with token
    return AWSResponse(200, { token });
  } catch (error) {
    console.error('ERROR on login =>', error);
    return AWSResponse(500, { message: 'Internal Server Error' });
  }
};

// Verify Token Handler
export const verify = async (event): Promise<APIGatewayAuthorizerResult> => {
  // Get JWT token from request headers
  const token = event.headers.Authorization;
  try {
    // Verify and decode JWT token
    const decoded = verifyToken(token);

    // Return authorizer result with principalId and policy document
    return {
      principalId: decoded.userId,
      policyDocument,
    };
  } catch (error) {
    console.error("Error in authorizer:", error);
    return {
      principalId: "user",
      policyDocument: denyPolicyDocument,
    };
  }
};
