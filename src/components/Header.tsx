import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Header: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={42} color="black" />
          <Text style={styles.username}>Sutisna</Text>
        </TouchableOpacity>

        <Ionicons
          name="notifications-outline"
          size={26}
          color="black"
          style={{ marginLeft: "auto" }}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
   profileButton: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Header;
