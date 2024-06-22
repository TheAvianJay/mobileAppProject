import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
//bellow is what is used to allow the user to input whatever thing comes to mind and it will be put into a list
export default function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [availableIds, setAvailableIds] = useState([]);
  const [sortOption, setSortOption] = useState('alphabetical');

  const addItem = () => {
    if (input) {
      let newId;
      if (availableIds.length > 0) {
        newId = Math.min(...availableIds);
        setAvailableIds(availableIds.filter(id => id !== newId));
      } else {
        newId = list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 1;
      }
      setList([...list, { id: newId, name: input }]);
      setInput('');
    }
  };
  //The items that are not as useful or are outdated can be removed thanks to this function.
  const deleteItem = (id) => {
    setList(list.filter(item => item.id !== id));
    setAvailableIds([...availableIds, id]);
  };

  const sortList = () => {
    let sortedList = [...list];
    if (sortOption === 'alphabetical') {
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortedList.sort((a, b) => a.id - b.id);
    }
    setList(sortedList);
  };
// below is the UI for the program
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Input List Organizer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Add Item" onPress={addItem} />
      <View style={styles.buttonContainer}>
        <Button title="Sort Alphabetically" onPress={() => { setSortOption('alphabetical'); sortList(); }} />
        <Button title="Sort by ID" onPress={() => { setSortOption('id'); sortList(); }} />
      </View>
      <FlatList
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.id}: {item.name}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}
//This is makes the text stand out and understandable
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    fontSize: 18,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});
