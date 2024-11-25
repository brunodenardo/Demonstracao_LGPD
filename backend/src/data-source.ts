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
  username: "postgres",
  password: "postgres",
  database: "apidb",
  synchronize: true, // Não use "true" em produção, pode apagar dados
  logging: false,
  entities: [__dirname + "/entities/*.ts"], // Caminho das entidades
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});