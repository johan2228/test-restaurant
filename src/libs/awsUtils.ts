import { APIGatewayProxyResult } from "aws-lambda";

type Headers = {
  [header: string]: boolean | number | string;
};

export const handlerPath = (context: string) => `${context.split(process.cwd())[1].substring(1).replace(/\\/g, "/")}`;
export const AWSResponse = <T>(statusCode: number, data: T, headers?: Headers | undefined): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Credentials": true,
      ...headers
    },
    body: JSON.stringify(data)
  };
};
export const cors = {
  origin: '*',
  headers: ["Content-Type", "Authorization"],
  allowCredentials: false
};

export const authorizer = {
  name: "verify",
  type: "request",
  identitySource: "method.request.header.Authorization",
  resultTtlInSeconds: 300,
};