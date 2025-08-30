import { Book } from "../models/Book";
import { bookRepository } from "../repositories/bookRepository";

export class BookService {
    async getAllBooks(): Promise<Book[]> {
        return bookRepository.find();
    }
    async createBook(title:string,author:string):Promise<Book>{
        const book=bookRepository.create({title,author});
        return bookRepository.save(book);
    }
    async markBookAsRead(id:number):Promise<Book|null>{
        const book=await bookRepository.findOneBy({id});
        if(!book)
            return null;
        book.read=true;
        return bookRepository.save(book);
    }
}