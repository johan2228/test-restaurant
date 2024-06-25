import { authorizer, handlerPath } from '@libs/index';

export default {
  listTransactions: {
    handler: `${handlerPath(__dirname)}/handler.listTransactions`,
    events: [
      {
        http: {
          method: 'get',
          path: 'transactions',
          authorizer
        },
      },
    ],
  },
};
