import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
//@ts-ignore
import { RootStackParamList } from "../Common/StackNavigator";


type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, "Registration">;

export default function StartScreen() {

    const navigation = useNavigation<RegistrationScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image source={require("../assets/images/icon.png")} style={styles.image} />

      {/* Title */}
      <Text style={styles.title}>Let's Tracking Assignments</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Track your assignments, meet deadlines, and boost productivity all in one place
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Registration")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5", // Light gray background
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#6FC3B2", // Light teal color
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
