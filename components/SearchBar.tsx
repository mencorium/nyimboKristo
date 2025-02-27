import React, { useState, useCallback } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onPressBack: () => void;
  onPressEllipsis: () => void;
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchSongs: React.FC<SearchBarProps> = ({
  onPressBack,
  onPressEllipsis,
  onSearch,
  placeholder = "Search...",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Debounced search function to avoid excessive calls
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
    setTimeout(() => onSearch(text), 300); // Adds a delay before executing search
  }, []);

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={onPressBack} style={styles.iconButton}>
        <Ionicons name="arrow-back-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholder={placeholder}
        placeholderTextColor="#999"
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />

      {/* Ellipsis */}
      <TouchableOpacity onPress={onPressEllipsis} style={styles.iconButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#333",
    paddingHorizontal: 15,
    height: 60,
    alignItems: "center",
  },
  iconButton: {
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#555", // Slightly lighter background for contrast
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    height: 40,
  },
});

export default SearchSongs;
