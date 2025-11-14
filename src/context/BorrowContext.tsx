import React, { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "../types/Book";

interface BorrowedBook extends Book {
  tanggalPeminjaman: string;
  batasPengembalian: string;
}

interface BorrowContextType {
  borrowedBooks: BorrowedBook[];
  borrowBook: (book: Book) => void;
  returnBook: (id: string) => void;
}

const BorrowContext = createContext<BorrowContextType | undefined>(undefined);

export const BorrowProvider = ({ children }: { children: ReactNode }) => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

  const borrowBook = (book: Book) => {
    if (!borrowedBooks.find(b => b.id === book.id)) {
      const now = new Date();
      const batas = new Date(now);
      batas.setDate(batas.getDate() + 10);

      const borrowedBook: BorrowedBook = {
        ...book,
        tanggalPeminjaman: now.toISOString().split("T")[0], 
        batasPengembalian: batas.toISOString().split("T")[0],
      };

      setBorrowedBooks(prev => [...prev, borrowedBook]);
    }
  };

  const returnBook = (id: string) => {
    setBorrowedBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <BorrowContext.Provider value={{ borrowedBooks, borrowBook, returnBook }}>
      {children}
    </BorrowContext.Provider>
  );
};

export const useBorrow = () => {
  const context = useContext(BorrowContext);
  if (!context) {
    throw new Error("useBorrow harus digunakan di dalam BorrowProvider");
  }
  return context;
};
