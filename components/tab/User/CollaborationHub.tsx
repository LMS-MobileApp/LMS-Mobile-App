import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const membersData = [
  { id: "1", email: "email01.gmail.com", image: "https://media.istockphoto.com/id/2015429231/vector/vector-flat-illustration-in-black-color-avatar-user-profile-person-icon-profile-picture.jpg?s=612x612&w=0&k=20&c=Wu70OARg2npxWy5E22_ZLneabuTafvV_6avgYPhWOoU=" },
  { id: "2", email: "email02.gmail.com", image: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" },
  { id: "3", email: "email03.gmail.com", image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" },
  { id: "4", email: "email04.gmail.com", image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" },
  { id: "5", email: "email05.gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s" },
  { id: "6", email: "email06.gmail.com", image: "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" },
  { id: "7", email: "email07.gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&s" },
  { id: "8", email: "email08.gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&s" },
  { id: "9", email: "email09.gmail.com", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" },
  { id: "10", email: "email10.gmail.com", image: "https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.jpg?s=612x612&w=0&k=20&c=chnP70yMIsbzuyz1uVWn6mQ5GhZYH9_OL26TpgQAxyE=" },
];

export default function CollaborationHub() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<{ id: string; email: string; image: string }[]>([]);

  // Add Member Function
  const handleAddMember = (member: { id: string; email: string; image: string }) => {
    if (!selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collaboration Hub</Text>

      <View style={styles.teamRow}>
        <Text style={styles.teamText}>Team Members</Text>
        <TouchableOpacity
          style={styles.pulseButton}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="plus" size={16} color="black" />
        </TouchableOpacity>
      </View>

      {/* Selected Members Grid */}
      <View style={styles.membersContainer}>
        {selectedMembers.map((member) => (
          <Image key={member.id} source={{ uri: member.image }} style={styles.memberAvatar} />
        ))}
      </View>

      {/* Modal for Adding Members */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Members</Text>

            {/* Scrollable area */}
            <View style={styles.scrollArea}>
              <FlatList
                data={membersData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.memberRow}>
                    <Image source={{ uri: item.image }} style={styles.avatar} />
                    <Text style={styles.emailText}>{item.email}</Text>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}  onPress={() => handleAddMember(item)}>Add</Text>
                    </TouchableOpacity>
                  </View>
                )}
                showsVerticalScrollIndicator={true}
              />
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  teamText: {
    fontSize: 16,
    flex: 1,
  },
  pulseButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  membersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    minHeight: 80,
    justifyContent: "flex-start",
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: "85%",
    maxHeight: height * 0.8,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollArea: {
    width: "100%",
    flexGrow: 1,
    height: height * 0.5,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  emailText: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#77c7c7",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#ff5757",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
