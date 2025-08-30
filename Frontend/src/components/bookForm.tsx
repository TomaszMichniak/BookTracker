import { useState } from "react";
import InputComponent from "./inputComponent";
import type { BookFormData } from "../types/bookFormData";
import { CreateBook } from "../api/book";

type Props = {
    onClose: () => void;
    reloadBooks: () => void;
}
const BookForm = ({ onClose, reloadBooks }: Props) => {
    const [formData, setFormData] = useState<BookFormData>({ author: "", title: "" })
    const [formError, setFormError] = useState<Record<keyof BookFormData, boolean>>({
        author: false,
        title: false,
    });
    const updateForm = (data: Partial<BookFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));

        setFormError((prev) => {
            const newErrors = { ...prev };

            for (const key in data) {
                const k = key as keyof BookFormData;
                newErrors[k] = false;
            }

            return newErrors;
        });
    };
    const handleSubmit = async () => {
        try {
            if (!validate()) return
            await CreateBook(formData);
            onClose();
            reloadBooks();
        } catch (error: any) {
            alert(error.message)
        }

    }
    const validate = () => {
        const newErrors: Record<keyof BookFormData, boolean> = {
            author: formData.author.length < 1,
            title: formData.title.length < 1,
        };
        setFormError(newErrors);
        return !Object.values(newErrors).some((v) => v);
    }
    return (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-start z-50">
            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-lg w-full max-w-md mt-20 relative">

                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-4xl text-white cursor-pointer mb-4
                    transform transition-transform duration-100 hover:scale-120 "
                >
                    ×
                </button>

                <h2 className="text-white text-center text-xl mb-4">
                    Add new book
                </h2>

                <InputComponent placeholder="Author" value={formData.author} onChange={(e) => updateForm({ author: e.target.value })} error={formError.author} ></InputComponent>
                <InputComponent placeholder="Title" value={formData.title} onChange={(e) => updateForm({ title: e.target.value })} error={formError.title}></InputComponent>

                <button
                    onClick={handleSubmit}
                    className="mt-4 w-full px-4 py-2 rounded-xl font-semibold transition text-white shadow-lg
                        bg-gradient-to-r from-emerald-500  to-emerald-700 hover:from-emerald-600 hover:to-emerald-800">
                    Dodaj
                </button>
            </div>
        </div>)
}
export default BookForm