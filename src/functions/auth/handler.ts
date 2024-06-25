import { APIGatewayAuthorizerResult, APIGatewayProxyHandler } from 'aws-lambda';
import { AWSResponse, DatabaseManager, hashPassword, comparePassword, generateToken, verifyToken } from '@libs/index';
import User from '@entities/User';
import { policyDocument, denyPolicyDocument } from './types';

// Register Handler
export const register: APIGatewayProxyHandler = async (event) => {
  const { name, email, password } = JSON.parse(event.body);

  try {
    const manager = await DatabaseManager.getManager();
    const hashedPassword = await hashPassword(password);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await manager.save(user);

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
    const manager = await DatabaseManager.getManager();
    const user = await manager.findOne(User, { where: { email } });

    if (!user || !(await comparePassword(password, user.password))) {
      return AWSResponse(401, { message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    return AWSResponse(200, { token });
  } catch (error) {
    console.error('ERROR on login =>', error);
    return AWSResponse(500, { message: 'Internal Server Error' });
  }
};

// Verify Token Handler
export const verify = async (event): Promise<APIGatewayAuthorizerResult> => {
  const token = event.headers.Authorization;
  try {
    const decoded = verifyToken(token);
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
