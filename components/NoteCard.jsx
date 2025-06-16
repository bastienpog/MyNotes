// components/NoteCard.jsx
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

export function NoteCard({ note, cardSize }) {
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "low":
        return "🟢 Low";
      case "normal":
        return "🟠 Normal";
      case "high":
        return "🔴 High";
      default:
        return "";
    }
  };

  return (
    <View style={[styles.noteCard, { width: cardSize, height: cardSize }]}>
      <ThemedText type="default" style={styles.noteTitle}>
        {note.title}
      </ThemedText>
      <ThemedText type="default" style={styles.notePriority}>
        {getPriorityLabel(note.priority)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: "#eee",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 8,
    marginBottom: 16,
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
});
