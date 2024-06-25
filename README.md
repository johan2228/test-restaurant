## Test-restaurant

system designed to search for restaurants around the logged-in user

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).
For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

### Installation/deployment instructions

1. Clone the repository:

   - git clone https://github.com/johan2228/test-restaurant.git
   - git clone git@github.com:johan2228/test-restaurant.git

2. Install dependencies:

```sh
   npm install
```

3. Set environment variables:
   Create an .env file in the root of the project and add the necessary variables:
   - DB_HOST=localhost
   - DB_USER=your-user
   - DB_PASSWORD=your-password
   - DB_DATABASE=restaurant

```
### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for lambda functions
- `libs` - containing shared code base between  lambdas
- `entities`

```

```ini
test-restaurant
┣ src
┃ ┣ entities
┃ ┃ ┣ Transaction.ts
┃ ┃ ┣ User.ts
┃ ┃ ┗ index.ts
┃ ┣ functions
┃ ┃ ┣ auth
┃ ┃ ┃ ┣ handler.ts
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ types.ts
┃ ┃ ┣ restaurant
┃ ┃ ┃ ┣ handler.ts
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┣ transactions
┃ ┃ ┃ ┣ handler.ts
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┗ index.ts
┃ ┣ libs
┃ ┃ ┣ awsUtils.ts
┃ ┃ ┣ bcryptUtils.ts
┃ ┃ ┣ databaseManager.ts
┃ ┃ ┣ index.ts
┃ ┃ ┗ jwtUtils.ts
┃ ┣ migrations
┃ ┃ ┣ 1719270238301-userTable.ts
┃ ┃ ┗ 1719285073179-transactionTable.ts
┃ ┗ ormconfig.ts
┣ .env
┣ .eslintrc.js
┣ .gitignore
┣ README.md
┣ jest.config.js
┣ package-lock.json
┣ package.json
┣ serverless.ts
┗ tsconfig.json

```

```

### 3rd party libraries

- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

```
