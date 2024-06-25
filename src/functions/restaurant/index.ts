import { authorizer, handlerPath } from '@libs/index';

export default {
  nearby: {
    handler: `${handlerPath(__dirname)}/handler.nearby`,
    events: [
      {
        http: {
          method: 'get',
          path: 'restaurants/nearby',
          request: {
            parameters: {
              querystrings: {
                location: true,
                radius: true,
                type: false
              }
            }
          },
          authorizer
        },
      },
    ],
  },
};
