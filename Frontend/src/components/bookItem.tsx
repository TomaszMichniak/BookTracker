import type { Book } from "../types/book"

type Props = {
    book: Book;
    onMarkRead: (id: number) => void;
}

const BookItem = ({ book, onMarkRead }: Props) => {
    const handleMarkAsRead = () => {
        if (book.read) return

        onMarkRead(book.id)
    }
    return (
        <div
            key={book.id}
            className="relative bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
        >
            <div>
                <span
                    className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${book.read
                        ? "bg-emerald-400/20 text-emerald-300"
                        : "bg-sky-400/20 text-sky-300"
                        }`}
                >
                    {book.read ? "Read" : "New"}
                </span>
                <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
                <p className="text-slate-400 text-sm">Author: {book.author}</p>
            </div>

            <button
                onClick={handleMarkAsRead}
                className={`mt-4 w-full px-4 py-2 rounded-xl font-semibold transition text-white shadow-lg
            ${book.read
                        ? "bg-gradient-to-r from-emerald-500  to-emerald-700"
                        : "bg-gradient-to-r from-sky-500  to-sky-700 hover:from-sky-600 hover:to-sky-800 cursor-pointer"
                    }`}
            >
                {book.read ? "Read" : "Mark as read"}
            </button>
        </div>

    );
}
export default BookItem