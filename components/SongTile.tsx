import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window'); // To make the component responsive based on screen width

interface SongTileProps {
  songnumber: string; // Number for the song (e.g., "1")
  songTitle: string;  // Title of the song (e.g., "Song Name")
  onPress: (songName: string) => void; // onPress callback for the tile
}

const SongTile: React.FC<SongTileProps> = ({ songnumber, songTitle, onPress }) => {
  const handlePress = () => {
    onPress(songTitle); // Pass songTitle to onPress callback
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container, 
        pressed && styles.pressed
      ]}
      onPress={handlePress} // Call handlePress on press
    >
      <Text style={styles.number}>{songnumber}.</Text>
      <Text style={styles.title}>{songTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#333',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555', // Slightly lighter than the background for better visibility
    borderRadius: 5,
    marginVertical: 5,
  },
  pressed: {
    backgroundColor: '#555', // Highlight the tile when pressed
  },
  number: {
    width: width * 0.15, // 15% of the screen width for the number
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    flex: 1, // Takes up the remaining space
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlignVertical: 'center', // Ensures vertical alignment
  },
});

export default SongTile;
