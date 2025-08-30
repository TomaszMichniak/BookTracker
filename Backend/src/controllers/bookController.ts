import { Request, Response } from "express";
import { BookService } from "../services/bookService";
const bookService = new BookService();
export class BookController {
    async getAllBooks(req: Request,res: Response) {
        const books = await bookService.getAllBooks();
        res.json(books);
    }
    async addBook(req: Request, res: Response) {
        try {
            const { title, author } = req.body;
            const book = await bookService.createBook(title, author);
            res.status(201).json(book);
        } catch {
            res.status(400).json({ error: "Invalid data" });
        }
    }
    async markRead(req: Request, res: Response) {
        const book = await bookService.markBookAsRead(Number(req.params.id))
        if (!book) {
            return res.status(404).send("Book not found!");
        }
        res.json(book)
    }
}