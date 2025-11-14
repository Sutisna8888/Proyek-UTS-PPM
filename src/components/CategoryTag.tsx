import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  FlatList,
} from "react-native";

interface CategoryTagProps {
  categories: string[];               
  onSelect: (category: string) => void; 
}

const CategoryTag: React.FC<CategoryTagProps> = ({ categories, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Kategori</Text>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tag}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },
  text: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "500",
  },
});

export default CategoryTag;
