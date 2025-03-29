import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
//@ts-ignore
import { RootStackParamList } from "../Common/StackNavigator";

type AssignmentScreenProps = {
  route: RouteProp<RootStackParamList, "Assignments">;
  navigation: StackNavigationProp<RootStackParamList, "Assignments">;
};

const AssignmentScreen: React.FC<AssignmentScreenProps> = ({ route }) => {
  const { assignmentId } = route.params; // Get the assignment ID from the route params
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: "1",
      question: "What is React Native?",
      options: ["A Framework", "A Library", "A Language", "A Database"],
    },
    {
      id: "2",
      question: "Which company developed React Native?",
      options: ["Apple", "Google", "Facebook", "Microsoft"],
    },
    {
      id: "3",
      question: "What language is used in React Native?",
      options: ["Python", "Swift", "JavaScript", "C++"],
    },
  ];

  const handleAnswerSelect = (questionId: string, option: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const handleNext = () => {
    if (selectedAnswers[questions[currentQuestionIndex].id]) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers[questions[currentQuestionIndex].id]) {
      Alert.alert("Submission Successful", "Your answers have been submitted.");
    } else {
      alert("Please select an answer before submitting.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Assignment {assignmentId}</Text>
        <Text style={styles.course}>Course: React Native</Text>
        <Text style={styles.dueDate}>Due Date: 30th March 2025</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
        {questions[currentQuestionIndex].options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selectedAnswers[questions[currentQuestionIndex].id] === option && styles.selectedOption,
            ]}
            onPress={() => handleAnswerSelect(questions[currentQuestionIndex].id, option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  course: {
    fontSize: 16,
    color: "#666",
  },
  dueDate: {
    fontSize: 16,
    color: "red",
    marginTop: 5,
  },
  questionContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
  selectedOption: {
    borderColor: "#6CBEB6",
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: "#6CBEB6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AssignmentScreen;