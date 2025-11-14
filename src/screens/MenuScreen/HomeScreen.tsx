import React, { useEffect, useState } from "react";
import { StatusBar, Platform, ScrollView, Text, StyleSheet, FlatList, } from "react-native";
import { getBooks } from "../../api/bookApi";
import { Book } from "../../types/Book";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import BookCard from "../../components/BookCard";
import CategoryTag from "../../components/CategoryTag";
import { useBorrow } from "../../context/BorrowContext"; 

const HomeScreen = ({ navigation }: any) => {
  const [books, setBooks] = useState<Book[]>([]);
  const { borrowedBooks } = useBorrow(); 
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

  const handleCategoryPress = (category: string) => {
    navigation.navigate("SearchResult", { query: category, type: "category" });
  };

  const categories = Array.from(new Set(books.map((b) => b.kategori))).slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <SearchBar />
      <CategoryTag
        categories={categories }
        onSelect={(cat) => navigation.navigate("SearchResult", { query: cat })}
      />
      <Text style={styles.sectionTitle}>Baru Ditambahkan</Text>
      <FlatList
        horizontal
        data={books.slice(0, 6)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookCard book={item} onPress={() => handleBookPress(item)} />
        )}
        showsHorizontalScrollIndicator={false}
      />

      {borrowedBooks.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Buku yang Dipinjam</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={borrowedBooks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BookCard book={item} onPress={() => handleBookPress(item)} />
            )}
            style={styles.borrowList}
          />
        </>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 14, 
    backgroundColor: "#7EE0E2",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  borrowList: {
    marginBottom: 15,
  },
  categoryList: {
    marginBottom: 15,
  },
});

export default HomeScreen;
