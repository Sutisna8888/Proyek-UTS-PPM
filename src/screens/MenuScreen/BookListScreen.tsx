import React, { useEffect, useState } from "react";
import {StatusBar, Platform, ScrollView, Text, StyleSheet } from "react-native";
import { getBooks } from "../../api/bookApi";
import { Book } from "../../types/Book";
import SearchBar from "../../components/SearchBar";
import BookCard from "../../components/BookCard";

const BookListScreen = ({ navigation }: any) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  const handleBookPress = (book: Book) => {
    navigation.navigate("BookDetail", { book });
  };

  const groupedByCategory = books.reduce((acc: any, book) => {
    if (!acc[book.kategori]) acc[book.kategori] = [];
    acc[book.kategori].push(book);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <SearchBar />

      {Object.keys(groupedByCategory).map((category) => (
        <React.Fragment key={category}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {groupedByCategory[category].map((book: Book) => (
              <BookCard
                key={book.id}
                book={book}
                onPress={() => handleBookPress(book)}
              />
            ))}
          </ScrollView>
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
   },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default BookListScreen;
