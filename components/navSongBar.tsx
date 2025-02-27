import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NavBarProps {
  onPressBackArrow: () => void;
}

const NavSongBar: React.FC<NavBarProps> = ({ onPressBackArrow }) => {
  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={onPressBackArrow} style={styles.iconButton}>
        <Ionicons name="arrow-back-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.text}>Nyimbo za Wakristo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#000",
    paddingHorizontal: 15,
    height: 60,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconButton: {
    paddingHorizontal: 10,
  },
});

export default NavSongBar;
