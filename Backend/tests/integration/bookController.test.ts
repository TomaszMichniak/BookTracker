import { BookController } from "../../src/controllers/bookController";
import { BookService } from "../../src/services/bookService";
import { bookRepository } from "../../src/repositories/bookRepository";

const request = require('supertest');
const express = require('express');

jest.mock("../../src/repositories/bookRepository");

describe("BookController", () => {
  let controller: BookController;
  let app = express();
  beforeEach(() => {
    jest.clearAllMocks();
    controller = new BookController();


    app.use(express.json());
    app.get("/books", controller.getAllBooks.bind(controller));
    app.post("/books", controller.addBook.bind(controller));
    app.patch("/books/:id/read", controller.markRead.bind(controller));
  });

  it("GET /books should return books", async () => {
    (bookRepository.find as jest.Mock).mockResolvedValue([
      { id: 1, title: "Book1", author: "Author1", read: false }
    ]);

    const res = await request(app).get("/books");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(bookRepository.find).toHaveBeenCalled();
  });

  it("POST /books should create a book", async () => {
    const newBook = { id: 1, title: "Book1", author: "Author1", read: false };
    (bookRepository.create as jest.Mock).mockReturnValue(newBook);
    (bookRepository.save as jest.Mock).mockResolvedValue(newBook);

    const res = await request(app)
      .post("/books")
      .send({ title: "Book1", author: "Author1" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(newBook);
    expect(bookRepository.create).toHaveBeenCalledWith({ title: "Book1", author: "Author1" });
    expect(bookRepository.save).toHaveBeenCalledWith(newBook);
  });

  it("PATCH /books/:id/read should mark book as read", async () => {
    const book = { id: 1, title: "Book1", author: "Author1", read: false };
    (bookRepository.findOneBy as jest.Mock).mockResolvedValue(book);
    (bookRepository.save as jest.Mock).mockResolvedValue({ ...book, read: true });

    const res = await request(app).patch("/books/1/read");

    expect(res.status).toBe(200);
    expect(res.body.read).toBe(true);
    expect(bookRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(bookRepository.save).toHaveBeenCalledWith({ ...book, read: true });
  });

  it("PATCH /books/:id/read should return 404 if book not found", async () => {
    (bookRepository.findOneBy as jest.Mock).mockResolvedValue(null);

    const res = await request(app).patch("/books/999/read");

    expect(res.status).toBe(404);
  });
});