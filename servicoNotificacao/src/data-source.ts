import { DataSource } from "typeorm";
import "reflect-metadata";
import * as dotenv from "dotenv";

dotenv.config();


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER_NOTIFICATION,
  password: process.env.POSTGRES_PASSWORD_NOTIFICATION,
  database: process.env.POSTGRES_DB_NOTIFICATION,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entities/*"], // Caminho das entidades
  migrations: [__dirname + "/migrations/*"],
  subscribers: [],
});