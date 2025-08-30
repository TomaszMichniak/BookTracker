import type { BookFormData } from "../types/bookFormData";
import { api } from "./axiosConfig";

export async function GetAllBooks() {
    try {
        const response = await api.get(`books`);
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error);
        throw new Error("Failed to fetch books.");
    }
}
export async function CreateBook(newBook: BookFormData) {
    try {
        const response = await api.post(`books`, newBook);
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error);
        throw new Error("Failed to create new book.");
    }
}
export async function MarkRead(id: number) {
    try {
        const response = await api.patch(`/books/${id}/read`)
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error);
        throw new Error("Failed to mark book.");
    }
}