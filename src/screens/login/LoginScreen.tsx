import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../../../assets/image/login_image1.jpg")}
      style={styles.background}
      blurRadius={1.5}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/image/icon-book1.png")}
            style={styles.icon}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#000"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace("Main")}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ccf6ff",
    width: 290,
    borderRadius: 30,
    paddingVertical: 30,
    alignItems: "center",
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#b3e0ff",
    width: 200,
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#2ecc71",
    paddingVertical: 7,
    paddingHorizontal: 70,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    color: "#000",
    marginVertical: 10,
    fontSize: 18,
  },
});
