import "reflect-metadata";
import "dotenv/config";
import { DataSourceOptions, DataSource } from "typeorm";
import { Link, User } from "./entities";
import { Initials1686418540213 } from "./migrations/1686418540213-initials";

const DataSourceSettings = (): DataSourceOptions => {
  const entities = [User, Link];
  const migrations = [Initials1686418540213];

  const node_env = process.env.NODE_ENV;

  if (node_env === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities,
      migrations,
    };
  }

  return {
    type: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities,
    migrations,
  };
};

const dataSource = DataSourceSettings();
const appDataSource = new DataSource(dataSource);

export default appDataSource;
