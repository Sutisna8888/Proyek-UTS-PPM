import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Book } from "../types/Book";

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error: any) {
    console.warn("Gagal mengambil daftar buku:", error.message);
    return []; 
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.warn(`Gagal mengambil detail buku dengan ID ${id}:`, error.message);
    return null; 
  }
};