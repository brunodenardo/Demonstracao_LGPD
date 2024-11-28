import { DataSource } from "typeorm";
import "reflect-metadata";
import * as dotenv from "dotenv";

dotenv.config();

const dbPassword = process.env.POSTGRES_PASSWORD;
console.log(dbPassword)

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entities/*"], // Caminho das entidades
  migrations: [__dirname + "/migrations/*"],
  subscribers: [],
});