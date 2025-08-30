import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./models/Book";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "BookTracker.db",
  synchronize: true,
  logging: false,
  entities: [Book],
});