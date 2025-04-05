import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from "@expo/vector-icons";

const AddAssignment = () => {
  const [formData, setFormData] = useState({
    dueDate: new Date(),
    dueTime: new Date(),
    title: "",
    course: "",
    subject: "",
    selectedFile: null as DocumentPicker.DocumentPickerResult | null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled) {
      //@ts-ignore
      setFormData({ ...formData, selectedFile: result });
    }
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, dueDate: selectedDate });
    }
  };

  const handleTimeChange = (event: any, selectedTime: any) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setFormData({ ...formData, dueTime: selectedTime });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assignment</Text>

      <TouchableOpacity style={styles.addButton} onPress={pickFile}>
        <FontAwesome name="file" size={18} color="white" />
        <Text style={styles.addButtonText}>Add Assignment</Text>
      </TouchableOpacity>

      {formData.selectedFile && formData.selectedFile.assets && (
        <Text style={styles.fileName}>
          <FontAwesome name="file-pdf-o" size={16} color="red" />{" "}
          {formData.selectedFile.assets[0]?.name}
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Assignment Title"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{formData.dueDate.toDateString()}</Text>
        <FontAwesome
          name="calendar"
          size={18}
          color="gray"
          style={styles.icon}
        />
      </TouchableOpacity>
      {/* {showDatePicker && (
        <DateTimePicker
          value={formData.dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )} */}

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>{formData.dueTime.toLocaleTimeString()}</Text>
        <FontAwesome
          name="clock-o"
          size={18}
          color="gray"
          style={styles.icon}
        />
      </TouchableOpacity>
      {/* {showTimePicker && (
        <DateTimePicker
          value={formData.dueTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )} */}

      <TextInput
        style={styles.input}
        placeholder="Course"
        value={formData.course}
        onChangeText={(text) => setFormData({ ...formData, course: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={formData.subject}
        onChangeText={(text) => setFormData({ ...formData, subject: text })}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E5E5E5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7FCAC3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  fileName: {
    fontSize: 14,
    color: "black",
    marginBottom: 30,
    marginLeft: 7,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#7FCAC3",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddAssignment;
