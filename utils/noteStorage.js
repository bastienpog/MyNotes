import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "NOTES";

export async function saveNotes(notes) {
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export async function loadNotes() {
  const json = await AsyncStorage.getItem(NOTES_KEY);
  return json ? JSON.parse(json) : [];
}

export async function deleteNote(id) {
  const notes = await loadNotes();
  const updatedNotes = notes.filter((note) => note.id !== id);
  await saveNotes(updatedNotes);
}

export async function updateNote(updatedNote) {
  const notes = await loadNotes();
  const newNotes = notes.map((note) =>
    note.id === updatedNote.id ? updatedNote : note
  );
  await saveNotes(newNotes);
}
