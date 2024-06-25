import { handlerPath } from '@libs/index';

export default {
  verify: {
    handler: `${handlerPath(__dirname)}/handler.verify`,
  },
  register: {
    handler: `${handlerPath(__dirname)}/handler.register`,
    events: [
      {
        http: {
          method: 'post',
          path: 'auth/register',
        },
      },
    ],
  },
  login: {
    handler: `${handlerPath(__dirname)}/handler.login`,
    events: [
      {
        http: {
          method: 'post',
          path: 'auth/login',
        },
      },
    ],
  },
};
