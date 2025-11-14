import React, { useMemo, useState } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Book } from "../../types/Book";
import { useBorrow } from "../../context/BorrowContext";
import { useFavorite } from "../../context/FavoriteContext";

const { width } = Dimensions.get("window");

export default function BookDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { book }: { book: Book } = route.params;
  const { borrowedBooks, borrowBook, returnBook } = useBorrow();

  const { addFavorite, removeFavorite, isFavorite } = useFavorite();
  const [fav, setFav] = useState(isFavorite(book.id));

  const [activeTab, setActiveTab] = useState<"detail" | "desc" | "status">("detail");
  const [isAvailable, setIsAvailable] = useState(book.Tersedia);

  const borrowedData = useMemo(
    () => borrowedBooks.find((b) => b.id === book.id),
    [borrowedBooks, book.id]
  );

  const handleBorrow = () => {
    borrowBook(book);
    setIsAvailable(false);
    Alert.alert("Berhasil", `Buku "${book.Judul}" berhasil dipinjam.`);
  };

  const handleReturn = () => {
    returnBook(book.id);
    setIsAvailable(true);
    Alert.alert("Berhasil", `Buku "${book.Judul}" telah dikembalikan.`);
  };

  const handleFavorite = () => {
    if (fav) {
      removeFavorite(book.id);
      Alert.alert("Dihapus", "Buku dihapus dari favorit");
    } else {
      addFavorite(book);
      Alert.alert("Ditambahkan", "Buku ditambahkan ke favorit");
    }
    setFav(!fav);
  };

  const formatDateDisplay = (isoOrDateStr?: string) => {
    if (!isoOrDateStr) return "-";
    const d = new Date(isoOrDateStr);
    if (isNaN(d.getTime())) return isoOrDateStr;
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.coverWrap}>
          <Image source={{ uri: book.image }} style={styles.cover} resizeMode="cover" />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Kembali"
          >
            <Ionicons name="arrow-back" size={22} color="#111" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
            <Ionicons name={fav ? "heart" : "heart-outline"} size={26} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.tabRow}>
            {["detail", "desc", "status"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab as any)}
              >
                <Text
                  style={[styles.tabText, activeTab === tab && styles.tabTextActive]}
                >
                  {tab === "detail"
                    ? "Detail"
                    : tab === "desc"
                    ? "Deskripsi"
                    : "Status"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.tabContent} contentContainerStyle={{ paddingBottom: 24 }}>
            {activeTab === "detail" && (
              <View>
                <Text style={styles.title}>{book.Judul}</Text>
                <Text style={styles.subtitle}>{book.Penulis}</Text>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Penerbit</Text>
                  <Text style={styles.infoValue}>{book.Penerbit || "-"}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Kategori</Text>
                  <Text style={styles.infoValue}>
                    {(book as any).kategori || (book as any).Genere || "-"}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Tanggal Terbit</Text>
                  <Text style={styles.infoValue}>{book.TanggalTerbit || "-"}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Bahasa</Text>
                  <Text style={styles.infoValue}>{book.Bahasa || "-"}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Jumlah Halaman</Text>
                  <Text style={styles.infoValue}>{book.JumlahHalaman || "-"}</Text>
                </View>
              </View>
            )}

            {activeTab === "desc" && (
              <View>
                <Text style={styles.title}>Deskripsi</Text>
                <Text style={styles.paragraph}>
                  {(book as any).Deskripsi ||
                    (book as any).deskripsi ||
                    "Tidak ada deskripsi tersedia."}
                </Text>
              </View>
            )}

            {activeTab === "status" && (
              <View>
                <Text style={styles.title}>Status Peminjaman</Text>
                <View style={styles.statusRow}>
                  <View style={styles.statusBadge}>
                    <Text style={[styles.statusText, { color: isAvailable ? "#0b8457" : "#a00" }]}>
                      {isAvailable ? "Tersedia" : "Tidak Tersedia"}
                    </Text>
                  </View>

                  {borrowedData ? (
                    <View style={styles.borrowBox}>
                      <Text style={styles.borrowLabel}>Tanggal Peminjaman</Text>
                      <Text style={styles.borrowValue}>
                        {formatDateDisplay(borrowedData.tanggalPeminjaman)}
                      </Text>

                      <Text style={[styles.borrowLabel, { marginTop: 10 }]}>
                        Batas Pengembalian
                      </Text>
                      <Text style={styles.borrowValue}>
                        {formatDateDisplay(borrowedData.batasPengembalian)}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.hint}>Buku ini belum dipinjam.</Text>
                  )}
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.actionArea}>
            {borrowedData ? (
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: "#f97316" }]}
                onPress={handleReturn}
              >
                <Text style={styles.primaryButtonText}>Kembalikan Buku</Text>
              </TouchableOpacity>
            ) : isAvailable ? (
              <TouchableOpacity style={styles.primaryButton} onPress={handleBorrow}>
                <Text style={styles.primaryButtonText}>Pinjam Buku</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.primaryButton, styles.disabledButton]} disabled>
                <Text style={styles.primaryButtonText}>Tidak Tersedia</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  coverWrap: { width: "100%", height: width * 0.9, backgroundColor: "#eee" },
  cover: { width: "55%", height: "90%", alignSelf: "center", marginTop: 20, borderRadius: 12 },
  backButton: {
    position: "absolute",
    top: 30,
    left: 14,
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 8,
    borderRadius: 20,
  },
  favoriteButton: {
    position: "absolute",
    top: 30,
    right: 14,
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 8,
    borderRadius: 20,
  },
  cardContainer: {
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    paddingTop: 13,
    shadowColor: "#000",
    shadowOffset: { width: 25, height: -2 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  tabRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 6,
  },
  tabButton: { flex: 1, alignItems: "center", paddingVertical: 8, borderRadius: 10 },
  tabActive: { backgroundColor: "#fff", elevation: 3 },
  tabText: { color: "#6b7280", fontWeight: "600" },
  tabTextActive: { color: "#111" },
  tabContent: { marginTop: 12, paddingHorizontal: 16 },
  title: { fontSize: 20, fontWeight: "700", color: "#111", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 14 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoLabel: { color: "#6b7280", fontSize: 14 },
  infoValue: { color: "#111", fontSize: 14, textAlign: "right" },
  paragraph: { color: "#374151", fontSize: 15, marginTop: 6, lineHeight: 20 },
  statusRow: { marginTop: 8 },
  statusBadge: { marginBottom: 10 },
  statusText: { fontWeight: "700" },
  borrowBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e6eef7",
  },
  borrowLabel: { color: "#6b7280", fontSize: 13 },
  borrowValue: { fontSize: 15, color: "#0f172a", fontWeight: "600" },
  hint: { color: "#6b7280", marginTop: 6 },
  actionArea: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  primaryButton: {
    backgroundColor: "#0b84ff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  disabledButton: { backgroundColor: "#c7c7c7" },
});
