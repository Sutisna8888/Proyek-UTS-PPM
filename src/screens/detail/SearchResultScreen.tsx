import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getBooks } from "../../api/bookApi";
import { Book } from "../../types/Book";

export default function SearchResultScreen({ navigation }: any) {
  const route = useRoute<any>();
  const { query } = route.params;
  const [results, setResults] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const allBooks: Book[] = await getBooks();
              const filtered: Book[] = allBooks.filter(
        (book) =>
          book.Judul.toLowerCase().includes(query.toLowerCase()) ||
          book.kategori?.toLowerCase().includes(query.toLowerCase())
      );setResults(filtered);
      } catch (error) {
        console.log("Gagal memuat hasil pencarian:", error);
      }
    };
    fetchBooks();
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hasil Pencarian untuk "{query}"</Text>

      {results.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Tidak ada hasil ditemukan untuk "{query}"
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookCard}
              onPress={() => navigation.navigate("BookDetail", { book: item })}
            >
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <Text numberOfLines={1} style={styles.bookTitle}>
                {item.Judul}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: "#7EE0E2", 
    padding: 20 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10,
    marginTop: 40,
  },
  bookCard: { 
    marginBottom: 15, 
    alignItems: "center" 
  },
  bookImage: { 
    width: 100, 
    height: 140, 
    borderRadius: 8, 
    backgroundColor: "#ccc" 
  },
  bookTitle: { marginTop: 6, 
    fontSize: 13, 
    textAlign: "center", 
    width: 100 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});
