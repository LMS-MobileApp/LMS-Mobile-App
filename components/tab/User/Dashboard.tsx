import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ProgressChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
//@ts-ignore
import { RootStackParamList } from "../Common/StackNavigator";
import { useNavigation } from "@react-navigation/native";
import UserProfileScreen from "./UserProfileScreen";

const screenWidth = Dimensions.get("window").width;

// AssignmentViewScreen
type AssignmentViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AssignmentView"
>;

//UserProfileScreen
type UserProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserProfile"
>;

//SettingScreen
type SettingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Setting"
>;

export default function Dashboard() {
  const AssignmentView = useNavigation<AssignmentViewScreenNavigationProp>();
  const UserProfileView = useNavigation<UserProfileScreenNavigationProp>();
  const SettingView = useNavigation<SettingScreenNavigationProp>();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Sidebar */}
      {menuOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity
            onPress={() => setMenuOpen(false)}
            style={styles.closeIcon}
          >
            <FontAwesome name="times" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.sidebarTitle}>Menu</Text>
          {/* <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>Home</Text></TouchableOpacity> */}
          <TouchableOpacity style={styles.menuButton}>
            <Text
              style={styles.menuText}
              onPress={() => AssignmentView.navigate("AssignmentView")}
            >
              Assignments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Text
              style={styles.menuText}
              onPress={() => UserProfileView.navigate("UserProfile")}
            >
              Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Text
              style={styles.menuText}
              onPress={() => SettingView.navigate("Setting")}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Hamburger Icon */}
      <TouchableOpacity
        onPress={() => setMenuOpen(true)}
        style={styles.hamburgerIcon}
      >
        <FontAwesome name="bars" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/2015429231/vector/vector-flat-illustration-in-black-color-avatar-user-profile-person-icon-profile-picture.jpg?s=612x612&w=0&k=20&c=Wu70OARg2npxWy5E22_ZLneabuTafvV_6avgYPhWOoU=",
            }} // Replace with actual profile image
            style={styles.profileImage}
          />
          <Text style={styles.greeting}>Hello, Klera Ogasthine</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Due Assignments</Text>
            <Text style={styles.statValue}>20%</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Complete Assignments</Text>
            <Text style={styles.statValue}>1h 20m</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => AssignmentView.navigate("AssignmentView")}
          >
            <Text style={styles.buttonText}>Recent assignments</Text>
          </TouchableOpacity>
        </View>

        {/* Monthly Completed Assignments (Bar Chart) */}
        <Text style={styles.chartTitle}>Monthly Completed Assignments</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: ["Technology", "Car Brands", "Airlines"],
              datasets: [
                {
                  data: [85, 90, 75],
                  colors: [(opacity) => `rgba(34, 128, 176, ${opacity})`],
                },
                {
                  data: [65, 78, 51],
                  colors: [(opacity) => `rgba(255, 99, 132, ${opacity})`],
                },
                {
                  data: [25, 50, 20],
                  colors: [(opacity) => `rgba(54, 162, 235, ${opacity})`],
                },
              ],
            }}
            width={screenWidth * 0.9}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
              labelColor: () => "#000",
              barPercentage: 0.5,
            }}
            fromZero
            withInnerLines={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#222",
    opacity: 0.9,
    paddingTop: 50,
    paddingLeft: 20,
    zIndex: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  sidebarTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuButton: {
    paddingVertical: 15,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  hamburgerIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 5,
    padding: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  statsContainer: {
    width: "100%",
    alignItems: "center",
  },
  statBox: {
    width: "90%",
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34a0a4",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statTitle: {
    fontSize: 16,
    color: "#333",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    // padding: 15,
    elevation: 3,
  },
  button: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#34a0a4",
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});
