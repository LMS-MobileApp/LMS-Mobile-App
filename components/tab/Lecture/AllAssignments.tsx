import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// @ts-ignore
import { RootStackParamList } from '../Common/StackNavigator';
import { FontAwesome } from "@expo/vector-icons";

// Update Assignment
type UpdateAssignmentNavigationProp = StackNavigationProp<RootStackParamList, 'AddAssignment'>;

//Add new assignment
type AddAssignmentNavigationProp = StackNavigationProp<RootStackParamList, 'AddAssignment'>;

const assignmentsData = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Assignment ${String(i + 1).padStart(2, '0')}`,
}));

const ITEMS_PER_PAGE = 10;

export default function AllAssignments() {
  const navigationUpdateAssignment = useNavigation<UpdateAssignmentNavigationProp>();
  const navigationAddAssignment = useNavigation<AddAssignmentNavigationProp>();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(assignmentsData.length / ITEMS_PER_PAGE);
  const currentAssignments = assignmentsData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEdit = (id: number) => {
    navigationUpdateAssignment.navigate('AddAssignment', { id });
  };

  const handleDelete = (id: number) => {
    console.log('Delete Assignment', id);
    // Delete logic will go here
  };

  return (
    <View style={styles.container}>

<View style={styles.titleRow}>
  <Text style={styles.title}>All Assignment</Text>
  <TouchableOpacity
    style={styles.pulseButton}
    onPress={() => navigationAddAssignment.navigate('AddAssignment')}
  >
    <FontAwesome name="plus" size={16} color="black" />
  </TouchableOpacity>
</View>


      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Assignment Name</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>

      <FlatList
        data={currentAssignments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.assignmentText}>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item.id)}>
                <Icon name="pencil" size={20} color="green" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Icon name="trash" size={20} color="red" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => prev - 1)}
        >
          <Text style={styles.pageButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>{`${currentPage} / ${totalPages}`}</Text>
        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage((prev) => prev + 1)}
        >
          <Text style={styles.pageButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 30,
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 15,
    // marginBottom: 30,
  },
  pulseButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },

  menuItem: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  menuText: {
    color: '#fff',
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#999',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    width: '48%',
    textAlign: 'center',
    color: '#6CBEB6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  assignmentText: {
    width: '48%',
    textAlign: 'center',
  },
  actions: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    marginHorizontal: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    alignItems: 'center',
  },
  pageButton: {
    fontSize: 20,
    paddingHorizontal: 20,
    color: '#6CBEB6',
  },
  pageNumber: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
