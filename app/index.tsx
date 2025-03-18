import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, StyleSheet, FlatList, Text, Platform } from "react-native";
import Constants from "expo-constants";
import NavSearch from "@/components/navSearch";
import SongTile from "@/components/SongTile";
import { router } from "expo-router"; 
import mapSongsToImages from "@/utils/songMapper";

type Song = {
  songName: string;
  number: number;
};

const Index = () => {
  const allSongs = useMemo(() => mapSongsToImages(), []); // Memoize to avoid re-mapping
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(allSongs);
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearchSong = useCallback((text: string) => {
    setSearchQuery(text);
    setFilteredSongs(
      text.trim()
        ? allSongs.filter((item) =>
            item.songName.toLowerCase().includes(text.toLowerCase())
          )
        : allSongs
    );
  }, [allSongs]);

  const toggleSearch = useCallback(() => {
    setOpenSearch((prev) => !prev);
    setFilteredSongs(allSongs); // Reset on toggle
    setSearchQuery("");
  }, [allSongs]);

  const openSong = useCallback((songName: string) => {
    console.log("Opening song:", songName);
    router.push(`/song?name=${encodeURIComponent(songName)}`);
  }, []);

  return (
    <View style={styles.container}>
      <NavSearch
        handleSearchSong={handleSearchSong}
        toggleSearch={toggleSearch}
        openSearch={openSearch}
      />

      {filteredSongs.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <SongTile
              songTitle={item.songName}
              songnumber={item.number.toString()}
              onPress={() => openSong(item.songName)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    flex: 1,
    backgroundColor: "#1e1b26", // Darker shade for better contrast
    paddingHorizontal: 10,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    color: "#bbb",
    fontStyle: "italic",
  },
  listContent: {
    paddingVertical: 10,
  },
});

export default Index;
