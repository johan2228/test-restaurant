import { DataSource } from 'typeorm';
import * as Entities from "@entities/index";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
let { STAGE } = process.env;

if (!STAGE) STAGE = "local";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 5432),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,
  entities: Object.values(Entities),
  migrations: [__dirname + '/migrations/*.ts'],
  ...(STAGE !== 'local' && {
    ssl: {
      rejectUnauthorized: false,
    },
    extra: {
      sslmode: "disable",
    },
  }),
});
