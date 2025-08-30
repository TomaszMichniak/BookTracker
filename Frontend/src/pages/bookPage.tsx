import { useEffect, useState } from "react"
import { GetAllBooks, MarkRead } from "../api/book"
import BookItem from "../components/bookItem"
import BookForm from "../components/bookForm"
import type { Book } from "../types/book"

const BookPage = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [showBookForm, setShowBookForm] = useState<boolean>(false);


    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const data = await GetAllBooks();
            setBooks(data);
        } catch (error: any) {
            alert(error.message)
        }
    };

    const handleOnMark = async(id: number) => {
        try {
            await MarkRead(id);
            fetchBooks();
        } catch (error: any) {
            alert(error.message)
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                <header className="flex flex-row justify-between items-center gap-4" >
                    <h1 className="text-4xl font-bold">Book Tracker</h1>
                    <button onClick={() => setShowBookForm(!showBookForm)}
                        className="text-xl px-3 py-2 border border-slate-700 rounded-2xl bg-gradient-to-r from-emerald-500  to-emerald-700 hover:from-emerald-600 hover:to-emerald-800" >Add book</button>
                </header>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                    {books.map((book) => (
                        <BookItem key={book.id} book={book} onMarkRead={handleOnMark} />
                    ))}
                </div>
            </div>
            {showBookForm && (<BookForm onClose={() => setShowBookForm(false)} reloadBooks={fetchBooks} />)}
        </div>
    )
}
export default BookPage