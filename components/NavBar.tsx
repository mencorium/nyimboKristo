import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NavBarProps {
  onpressSearch: () => void;
  onPressEllipsis: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onPressEllipsis, onpressSearch }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nyimbo za Wakristo</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={onpressSearch} style={styles.iconButton}>
          <Ionicons name="search-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressEllipsis} style={styles.iconButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 15,
    height: 60,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default NavBar;
