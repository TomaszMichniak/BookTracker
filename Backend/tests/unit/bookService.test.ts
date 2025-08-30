import { bookRepository } from "../../src/repositories/bookRepository";
import { BookService } from "../../src/services/bookService";


jest.mock("../../src/repositories/bookRepository");

describe("BookService", () => {
    let service: BookService;

    beforeEach(() => {
        service = new BookService();
        jest.clearAllMocks();
    });

    it("should return all books", async () => {
        (bookRepository.find as jest.Mock).mockResolvedValue([{ id: 1, title: "Book1", author: "Author1", read: false }]);
        const books = await service.getAllBooks();
        expect(books).toHaveLength(1);
        expect(bookRepository.find).toHaveBeenCalled();
    });

    it("should create a book", async () => {
        const newBook = { id: 1, title: "Book1", author: "Author1", read: false };
        (bookRepository.create as jest.Mock).mockReturnValue(newBook);
        (bookRepository.save as jest.Mock).mockResolvedValue(newBook);

        const result = await service.createBook("Book1", "Author1");
        expect(result).toEqual(newBook);
        expect(bookRepository.create).toHaveBeenCalledWith({ title: "Book1", author: "Author1" });
        expect(bookRepository.save).toHaveBeenCalledWith(newBook);
    });

    it("should mark book as read", async () => {
        const book = { id: 1, title: "Book1", author: "Author1", read: false };
        (bookRepository.findOneBy as jest.Mock).mockResolvedValue(book);
        (bookRepository.save as jest.Mock).mockResolvedValue({ ...book, read: true });

        const result = await service.markBookAsRead(1);
        expect(result?.read).toBe(true);
        expect(bookRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
        expect(bookRepository.save).toHaveBeenCalledWith({ ...book, read: true });
    });

    it("should return null if book not found in markBookAsRead", async () => {
        (bookRepository.findOneBy as jest.Mock).mockResolvedValue(null);
        const result = await service.markBookAsRead(999);
        expect(result).toBeNull();
    });
});