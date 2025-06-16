import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import { loadNotes, saveNotes, updateNote } from "../utils/noteStorage";

export default function EditNoteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        const notes = await loadNotes();
        const note = notes.find((n) => n.id === id);
        if (note) {
          setTitle(note.title);
          setPriority(note.priority);
          setContent(note.content);
          setIsEditing(true);
        }
      })();
    }
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert("Please enter a title or content.");
      return;
    }

    if (isEditing) {
      const updatedNote = {
        id,
        title: title.trim(),
        priority,
        content: content.trim(),
      };
      try {
        await updateNote(updatedNote);
        Alert.alert("Note updated!");
        router.push("/");
      } catch (error) {
        Alert.alert("Error updating note");
        console.error(error);
      }
    } else {
      const newNote = {
        id: uuid.v4().toString(),
        title: title.trim(),
        priority,
        content: content.trim(),
      };
      try {
        const notes = await loadNotes();
        await saveNotes([...notes, newNote]);
        Alert.alert("Note saved!");
        setTitle("");
        setContent("");
        setPriority("normal");
        router.push("/");
      } catch (error) {
        Alert.alert("Error saving note");
        console.error(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Write your title here..."
          placeholderTextColor={"gray"}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={priority}
            style={styles.picker}
            onValueChange={setPriority}
            dropdownIconColor="#114B5F"
          >
            <Picker.Item label="🟢 Low" value="low" />
            <Picker.Item label="🟠 Normal" value="normal" />
            <Picker.Item label="🔴 High" value="high" />
          </Picker>
        </View>

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Write your note here..."
          placeholderTextColor={"gray"}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.fab} onPress={handleSave}>
          <MaterialIcons name="save" size={32} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 100,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#114B5F",
    marginBottom: 6,
    marginTop: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    backgroundColor: "#f9f9f9",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    color: "#114B5F",
    backgroundColor: "transparent",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    minHeight: 140,
    textAlignVertical: "top",
    marginBottom: 24,
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
});
