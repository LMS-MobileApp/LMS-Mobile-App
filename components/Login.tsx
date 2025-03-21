import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
//@ts-ignore
import { RootStackParamList } from "../Common/StackNavigator";

type RegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Registration"
>;

type UserDashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserDashboard"
>;

export default function Login() {
    const navigation = useNavigation<RegistrationScreenNavigationProp>();
    const navigationUser = useNavigation<UserDashboardScreenNavigationProp>();
  const [form, setForm] = useState({ name: "", password: "" });

  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image source={require("../assets/images/icon.png")} style={styles.image} />

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Registration Number"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigationUser.navigate("UserDashboard")}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign-in Link */}
      <Text style={styles.signInText} onPress={() => navigation.navigate("Registration")}>
        Already have an Account?{" "}
        <Text style={styles.signInLink}>Sign In</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  input: {
    width: "90%",
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 2, // Adds shadow
  },
  button: {
    backgroundColor: "#6FC3B2",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInText: {
    fontSize: 14,
    marginTop: 15,
    color: "#666",
  },
  signInLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
