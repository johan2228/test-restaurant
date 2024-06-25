import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { login, register } from "./handler";
import * as serviceModule from './service';
import { hashPassword } from '@libs/index';

describe('Handler - Login', () => {
  it('should return a 200 status code and token', async () => {
    const password = '123456'
    const user = {
      id: 1,
      email: 'johan@correo.com',
      name: 'Johan',
      password: await hashPassword(password)
    }
    const spyGetUser = jest.spyOn(serviceModule, 'getUser');
    spyGetUser.mockImplementation(async () => user);

    const event = {
      body: JSON.stringify({
        email: user.email,
        password,
      }),
    } as APIGatewayProxyEvent;
    const context = {} as Context;

    const result = await login(event, context, () => null) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(200);
    expect(spyGetUser).toHaveBeenCalledTimes(1);
    expect(JSON.parse(result.body).token).toBeTruthy();

    spyGetUser.mockRestore();
  });

  it('should return a 401 and invalid email or password', async () => {
    const password = '123456'
    const user = {
      id: 1,
      email: 'johan@correo.com',
      name: 'Johan',
      password: await hashPassword(password)
    }
    const spyGetUser = jest.spyOn(serviceModule, 'getUser');
    spyGetUser.mockImplementation(async () => user);

    const event = {
      body: JSON.stringify({
        email: user.email,
        password: "password_incorrect",
      }),
    } as APIGatewayProxyEvent;
    const context = {} as Context;

    const result = await login(event, context, () => null) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(401);
    expect(JSON.parse(result.body).message).toEqual("Invalid email or password");

    spyGetUser.mockRestore();
  });
});

describe('Handler - Register', () => {
  it('should return a 201 and message user registered successfully', async () => {

    const spyGetUser = jest.spyOn(serviceModule, 'saveUser');
    spyGetUser.mockImplementation(async () => null);

    const event = {
      body: JSON.stringify({
        email: 'johan@correo.com',
        name: 'Johan',
        password: '123456'
      }),
    } as APIGatewayProxyEvent;
    const context = {} as Context;

    const result = await register(event, context, () => null) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body).message).toEqual("User registered successfully");

    spyGetUser.mockRestore();
  });
});