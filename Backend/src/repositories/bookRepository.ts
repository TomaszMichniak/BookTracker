import { AppDataSource } from "../data-source";
import { Book } from "../models/Book";

export const bookRepository = AppDataSource.getRepository(Book);