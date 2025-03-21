import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";

export default function AssignmentView() {
  const [selectedSubject, setSelectedSubject] = useState("Math");
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  // Due Assignments (Not Completed)
  const dueAssignments = [
    { id: "1", title: "Assignment 01" },
    { id: "2", title: "Assignment 02" },
    { id: "3", title: "Assignment 03" },
  ];

  // Completed Assignments (With Correct Answers Count)
  const completedAssignments = [
    { id: "4", title: "Assignment 01", correctAnswers: 6, totalQuestions: 10 },
    { id: "5", title: "Assignment 02", correctAnswers: 8, totalQuestions: 10 },
    { id: "6", title: "Assignment 03", correctAnswers: 7, totalQuestions: 10 },
  ];

  // Function to Calculate and Show Progress
  const handleCompletedAssignmentClick = (assignment : any) => {
    const percentage = (assignment.correctAnswers / assignment.totalQuestions) * 100;
    setProgress(percentage);
    setShowProgress(true); // Show Progress After Click
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Assignment</Text>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.profileImage}
        />
      </View>

      {/* Subject Dropdown */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSubject}
          onValueChange={(itemValue) => setSelectedSubject(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Math" value="Math" />
          <Picker.Item label="Science" value="Science" />
          <Picker.Item label="English" value="English" />
        </Picker>
      </View>

      {/* Due Assignments */}
      <Text style={styles.sectionTitle}>Due Assignments</Text>
      <FlatList
        data={dueAssignments}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.assignmentBox}>
            <Text>{item.title}</Text>
          </View>
        )}
      />

      {/* Completed Assignments (Clickable) */}
      <Text style={styles.sectionTitle}>Completed Assignments</Text>
      <FlatList
        data={completedAssignments}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.assignmentBox}
            onPress={() => handleCompletedAssignmentClick(item)}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Show Progress Only After Clicking on Completed Assignment */}
      {showProgress && (
        <>
          <Text style={styles.progressTitle}>Completed Assignments</Text>
          <View style={styles.progressContainer}>
            <Slider
              style={{ width: "80%" }}
              minimumValue={0}
              maximumValue={100}
              value={progress}
              minimumTrackTintColor="#007BFF"
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor="#007BFF"
            />
            <Text>{progress.toFixed(0)}% Completed</Text>
          </View>
        </>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Attached Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Time Resume</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  pickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 3,
    marginBottom: 15,
  },
  picker: {
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  assignmentBox: {
    width: 100,
    height: 80,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#D3D3D3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

