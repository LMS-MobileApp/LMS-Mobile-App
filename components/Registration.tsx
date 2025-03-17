import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
//@ts-ignore
import { RootStackParamList } from "../Common/StackNavigator";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Registration"
>;

export default function Registration() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [form, setForm] = useState({
    name: "",
    registrationNumber: "",
    batch: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Welcome Stay Organized, Stay Ahead</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Let's Empower Your Learning, {"\n"} Master Your Deadlines
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Registration Number"
        value={form.registrationNumber}
        onChangeText={(text) => setForm({ ...form, registrationNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Batch"
        value={form.batch}
        onChangeText={(text) => setForm({ ...form, batch: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Sign-in Link */}
      <Text
        style={styles.signInText}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an Account? <Text style={styles.logInLink}>Log In</Text>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
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
  logInLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
