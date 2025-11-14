import React, { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "../types/Book";

interface FavoriteContextType {
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  const addFavorite = (book: Book) => {
    setFavorites((prev) =>
      prev.find((b) => b.id === book.id) ? prev : [...prev, book]
    );
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((b) => b.id !== id));
  };

  const isFavorite = (id: string) => favorites.some((b) => b.id === id);

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite harus digunakan di dalam FavoriteProvider");
  }
  return context;
};
