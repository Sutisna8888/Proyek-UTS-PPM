import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  User,
  BookOpen,
  Calendar,
  Edit,
  Lock,
  LogOut,
} from "lucide-react-native";
import { useBorrow } from "@/src/context/BorrowContext";
import { useFavorite } from "@/src/context/FavoriteContext";
import BookCard from "@/src/components/BookCard";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { borrowedBooks } = useBorrow();
  const { favorites } = useFavorite();

  const user = {
    name: "Sutisna",
    email: "sutisna@gmail.com",
    borrowedBooks: borrowedBooks.length,
    nextReturn:
      borrowedBooks.length > 0 ? borrowedBooks[0].batasPengembalian : "-",
  };

  const handleFeatureNotAvailable = (feature: string) => {
    Alert.alert(
      "Fitur Belum Aktif",
      `Fitur "${feature}" saat ini hanya simulasi dan belum terhubung ke sistem login.`,
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <User size={48} color="#4b5563" />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <BookOpen size={22} color="#2563eb" />
          <Text style={styles.infoText}>
            Buku Dipinjam: {user.borrowedBooks}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Calendar size={22} color="#16a34a" />
          <Text style={styles.infoText}>
            Batas Pengembalian: {user.nextReturn}
          </Text>
        </View>
      </View>

      <View style={styles.actionCard}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleFeatureNotAvailable("Edit Profil")}
        >
          <Edit size={22} color="#2563eb" />
          <Text style={styles.actionText}>Edit Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleFeatureNotAvailable("Ubah Kata Sandi")}
        >
          <Lock size={22} color="#f59e0b" />
          <Text style={styles.actionText}>Ubah Kata Sandi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Login")}
        >
          <LogOut size={22} color="#dc2626" />
          <Text style={styles.actionText}>Keluar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.favoriteSection}>
        <Text style={styles.sectionTitle}>Buku Favorit</Text>
        {favorites.length === 0 ? (
          <Text style={styles.emptyText}>Belum ada buku favorit</Text>
        ) : (
          <FlatList
            horizontal
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
             <BookCard
                book={item}
                onPress={() => navigation.navigate("BookDetail", { book: item })}
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        )}
      </View>

      <View style={{ marginVertical: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: "#6b7280",
  },
  infoCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    color: "#374151",
    fontSize: 15,
  },
  actionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
  },
  actionText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#374151",
  },
  favoriteSection: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },
  emptyText: {
    color: "#6b7280",
    fontStyle: "italic",
    fontSize: 14,
  },
});
