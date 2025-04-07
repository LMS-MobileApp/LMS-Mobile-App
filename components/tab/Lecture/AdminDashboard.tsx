import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
//@ts-ignore
import { RootStackParamList } from "../Common/StackNavigator";
import { useNavigation } from '@react-navigation/native';

//AddAssignmentScreen
type AddAssignmentNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddAssignment"
>;

//AllAssignmentsScreen
type AllAssignmentsNavigationProp = StackNavigationProp<  
    RootStackParamList,
    "AllAssignments"
  >;

//SettingScreen
type SettingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Setting"
>;

export default function AdminDashboard() {
    const navigationAddAssignment = useNavigation<AddAssignmentNavigationProp>();
    const SettingView = useNavigation<SettingScreenNavigationProp>();
  const navigationAllAssignments = useNavigation<AllAssignmentsNavigationProp>();

  const [course, setCourse] = useState(null);
  const [subject, setSubject] = useState(null);
  const [students, setStudents] = useState<
    { name: string; status: string; course: string; subject: string }[]
  >([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const courses = [
    { label: "Computer Science", value: "cs" },
    { label: "Business Management", value: "bm" },
  ];

  const subjects = [
    { label: "Math", value: "math" },
    { label: "Programming", value: "programming" },
  ];

  const allStudents = [
    { name: "Harshana", status: "submitted", course: "cs", subject: "math" },
    { name: "Dineth", status: "Not submitted", course: "cs", subject: "math" },
    { name: "Sarah", status: "submitted", course: "bm", subject: "programming" },
    { name: "John", status: "Not submitted", course: "bm", subject: "math" },
  ];

  const searchStudents = () => {
    if (course && subject) {
      const filtered = allStudents.filter(
        (student) => student.course === course && student.subject === subject
      );
      setStudents(filtered);
    } else {
      setStudents([]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Hamburger */}
      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => setMenuOpen(true)}
      >
        <FontAwesome name="bars" size={24} color="#000" />
      </TouchableOpacity>

      {/* Sidebar */}
      {menuOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity
            style={styles.closeSidebar}
            onPress={() => setMenuOpen(false)}
          >
            <FontAwesome name="times" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.sidebarTitle}>Menu</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText} onPress={() => navigationAddAssignment.navigate("AddAssignment")}>Assignments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText} onPress={() => navigationAllAssignments.navigate("AllAssignments")}>All Assignments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText} onPress={() => SettingView.navigate("Setting")}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Original UI */}
      <Text style={styles.greeting}>Hello, Klera Ogasthine</Text>

      <View style={styles.dropdownContainer}>
        <Dropdown
          data={courses}
          labelField="label"
          valueField="value"
          placeholder="Course"
          value={course}
          search
          searchPlaceholder="Search Course..."
          onChange={(item) => {
            setCourse(item.value);
            searchStudents();
          }}
          style={styles.dropdown}
        />
        <Dropdown
          data={subjects}
          labelField="label"
          valueField="value"
          placeholder="Subject"
          value={subject}
          search
          searchPlaceholder="Search Subject..."
          onChange={(item) => {
            setSubject(item.value);
            searchStudents();
          }}
          style={styles.dropdown}
        />
      </View>

      {students.length > 0 ? (
        <FlatList
          data={students}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.studentItem}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text
                style={[
                  styles.status,
                  item.status === "submitted"
                    ? styles.submitted
                    : styles.notSubmitted,
                ]}
              >
                {item.status}
              </Text>
            </View>
          )}
        />
      ) : (
        course &&
        subject && <Text style={styles.noResults}>No students found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    padding: 20,
    paddingTop: 60,
  },
  hamburger: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
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
  closeSidebar: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  sidebarTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  dropdown: {
    width: "48%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  studentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderColor: "#00796B",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  studentName: {
    fontSize: 16,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
  submitted: {
    color: "green",
  },
  notSubmitted: {
    color: "red",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
});
