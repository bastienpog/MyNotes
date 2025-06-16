// components/SearchBar.jsx
import { StyleSheet, TextInput } from "react-native";

export function SearchBar({ value, onChangeText }) {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="recherche"
      placeholderTextColor="gray"
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
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
});
