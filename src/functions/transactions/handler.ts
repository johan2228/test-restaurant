import { APIGatewayProxyHandler } from 'aws-lambda';
import { AWSResponse, DatabaseManager } from '@libs/index';
import { Transaction } from '@entities/index';

export const listTransactions: APIGatewayProxyHandler = async () => {
  try {
    const manager = await DatabaseManager.getManager();
    const transactions = await manager.find(Transaction);

    return AWSResponse(200, transactions);
  } catch (error) {
    console.error('ERROR =>', error);
    return AWSResponse(500, { message: 'Internal Server Error' });
  }
};
