import { AppDataSource } from "./data-source";
import { Book } from "./models/Book"
const sampleBooks = [
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
    { title: "Harry Potter and the Philosopher’s Stone", author: "J.K. Rowling" },
    { title: "Nineteen Eighty-Four", author: "George Orwell" },
    { title: "It", author: "Stephen King" },
    { title: "The Little Prince", author: "Antoine de Saint-Exupéry" },
];
function getRandomReadStatus(): boolean {
    return Math.random() < 0.5;
}
export async function seedDatabase() {
    try {
        const bookRepository = AppDataSource.getRepository(Book);
        const count = await bookRepository.count()
        if (count > 0) {
            console.log("Database already has data, skipping seeding.");
            return
        }

        for (const b of sampleBooks) {
            const book = bookRepository.create({ ...b, read: getRandomReadStatus() });
            await bookRepository.save(book);
        }
        console.log("Database seeded successfully!");
    } catch { }
}