import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Toast from "react-native-toast-message";
import { NoteCard } from "../components/NoteCard";
import { SearchBar } from "../components/SearchBar";
import { deleteNote, loadNotes } from "../utils/noteStorage";

export default function HomeScreen() {
  const [note, setNote] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await loadNotes();
      setNote(notes);
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteNote(id);
          setNote((prev) => prev.filter((n) => n.id !== id));
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Note deleted successfully!",
          });
        },
      },
    ]);
  };

  const renderRightActions = (item) => (
    <TouchableOpacity
      onPress={() => handleDelete(item.id)}
      style={styles.deleteButton}
    >
      <MaterialIcons name="delete" size={24} color="#fff" />
    </TouchableOpacity>
  );

  const filteredNotes = note.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />

      <View style={[styles.grid, { flexDirection: "row", flexWrap: "wrap" }]}>
        {filteredNotes.map((item) => (
          <Swipeable
            key={item.id}
            renderRightActions={() => renderRightActions(item)}
          >
            <Link href={{ pathname: "/Note", params: { id: item.id } }} asChild>
              <TouchableOpacity>
                <NoteCard note={item} cardSize={cardSize} />
              </TouchableOpacity>
            </Link>
          </Swipeable>
        ))}
      </View>
      {/* Floating Button */}
      <Link href="/EditNote" asChild>
        <TouchableOpacity style={styles.fab}>
          <MaterialIcons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const numColumns = 3;
const spacing = 16;
const totalSpacing = spacing * (numColumns + 1);
const cardSize = (screenWidth - totalSpacing) / numColumns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#114B5F",
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: "center",
    marginBottom: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    color: "#555",
  },
  searchInput: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 40,
    marginHorizontal: -spacing / 2,
  },

  noteCard: {
    width: cardSize,
    height: cardSize,
    backgroundColor: "#eee",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: spacing / 2,
    marginBottom: spacing,
  },
  noteTitle: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
    color: "#555",
  },
  notePriority: {
    fontSize: 12,
    color: "#555",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: "#114B5F",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  deleteButton: {
    backgroundColor: "#f45b69",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: cardSize,
    borderRadius: 8,
    marginHorizontal: spacing / 2,
    marginBottom: spacing,
  },
});
