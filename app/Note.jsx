import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { deleteNote, loadNotes } from "../utils/noteStorage";

export default function NoteScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [note, setNote] = useState();

  useEffect(() => {
    const fetchNote = async () => {
      const notes = await loadNotes();
      const found = notes.find((n) => n.id === id);
      setNote(found || null);
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!note) return;
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteNote(id);
          console.log("Note deleted");
          router.push("/");
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Note deleted successfully!",
          });
        },
      },
    ]);
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Note not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.priority}>
          {note.priority === "low" && "🟢 Low"}
          {note.priority === "normal" && "🟠 Normal"}
          {note.priority === "high" && "🔴 High"}
        </Text>
      </View>
      <TextInput
        style={styles.textArea}
        value={note.content}
        editable={false}
        multiline
        textAlignVertical="top"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/EditNote",
              params: { id: note.id },
            })
          }
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  priority: {
    fontSize: 18,
  },
  textArea: {
    flex: 1,
    width: "100%",
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    color: "#333",
    marginBottom: 16,
  },
  notFound: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 40,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    backgroundColor: "#456990",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: "#f45b69",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
