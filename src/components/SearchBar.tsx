import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigation = useNavigation<any>();

  const handleSearch = () => {
    if (query.trim() === "") return;
    navigation.navigate("SearchResult", { query });
  };

  return (
    <View style={styles.searchBar}>
      <Ionicons
        name="search"
        size={20}
        color="gray"
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Search for books..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
  },
});

export default SearchBar;
