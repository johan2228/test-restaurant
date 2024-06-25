import { PolicyDocument } from "aws-lambda";

export const denyPolicyDocument: PolicyDocument = {
  Version: "2012-10-17",
  Statement: [
    {
      Action: "execute-api:Invoke",
      Effect: "Deny",
      Resource: "*",
    },
  ],
};

export const policyDocument: PolicyDocument = {
  Version: "2012-10-17",
  Statement: [
    {
      Action: "execute-api:Invoke",
      Effect: "Allow",
      Resource: "*",
    },
  ],
};