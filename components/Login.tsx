import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
//@ts-ignore
import { RootStackParamList } from "../Common/StackNavigator";
import Auth from "../util/auth";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// type RegistrationScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "Registration"
// >;

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Login() {
  // const navigation = useNavigation<RegistrationScreenNavigationProp>();
  const navigation = useNavigation<NavigationProp>();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    const response: { success: boolean; token?: any; message?: string; role?: string } = await Auth.login(form);
    setLoading(false);

    if (response.success) {
      // navigationUser.navigate("UserDashboard");

      // If using role-based navigation:
      const userRole = response.token;
      console.log(response) 
      if (userRole ) {
        navigation.navigate("AdminDashboard");
      } else {
        navigation.navigate("UserDashboard");
      }
    } else {
      Alert.alert("Login Failed", response.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.image}
      />

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#666"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Sign-in Link */}
      <Text
        style={styles.signInText}
        onPress={() => navigation.navigate("Registration")}
      >
        Already have an Account? <Text style={styles.signInLink}>Sign In</Text>
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
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 2, // Adds shadow
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    // elevation: 2,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    marginLeft: 10,
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
