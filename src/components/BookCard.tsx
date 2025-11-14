import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Book } from "../types/Book";

export interface BookCardProps {
  book: Book;
  onPress: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: book.image }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={1}>
        {book.Judul}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: 12,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  info: {
    marginTop: 6,
    width: "100%",
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
});

export default BookCard;
