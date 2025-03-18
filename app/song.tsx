import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { Image } from "expo-image";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useLocalSearchParams, useRouter } from "expo-router";
import mapSongsToImages from "@/utils/songMapper";
import NavSongBar from "@/components/navSongBar";
import Constants from "expo-constants"; // Added missing import
import PitchPipe from "@/components/PitchPipe";

const { width, height } = Dimensions.get("window");

const MusicSheetScreen = () => {
  const { name} = useLocalSearchParams();
  const router = useRouter();
  const [songPath, setSongPath] = useState<string>("");
  const [songKey, setSongKey] = useState<string>("");
  const [flatKey, setFlatkey] = useState<boolean>(false);

  useEffect(() => {
    const imageMapper = mapSongsToImages();
    const matchedSong = imageMapper.find((item) => item.songName === name);
    if (matchedSong) {
      setSongPath(matchedSong.path);
      setSongKey(matchedSong.songKey? matchedSong.songKey : "C");
      setFlatkey(matchedSong.flat)
      console.log(matchedSong)
    }
  }, [name]);

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const lastOffsetX = useSharedValue(0);
  const lastOffsetY = useSharedValue(0);
  const maxScale = 3; // Set a max zoom limit
  const minScale = 1; // Default scale

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      const newScale = Math.max(minScale, Math.min(event.scale, maxScale));
      scale.value = newScale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (scale.value > 1) {
        translateX.value = lastOffsetX.value + event.translationX;
        translateY.value = lastOffsetY.value + event.translationY;
      }
    })
    .onEnd(() => {
      if (scale.value === 1) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      } else {
        lastOffsetX.value = translateX.value;
        lastOffsetY.value = translateY.value;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  console.log(songKey);

  return (
    <View style={styles.mainContainer}>
      <NavSongBar onPressBackArrow={() => router.back()} />
      <GestureHandlerRootView style={styles.flex}>
        <View style={styles.container}>
          <GestureDetector gesture={Gesture.Simultaneous(pinchGesture, panGesture)}>
            <Animated.View style={animatedStyle}>
              {songPath && (
                <Image
                  source={songPath}
                  style={styles.image}
                  contentFit="contain"
                  allowDownscaling={true}
                  transition={10}
                />
              )}
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
      <PitchPipe songTitle={name as string} songKey={ songKey } flatKey={ flatKey }/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    flex: 1,
    backgroundColor: "#fff",
  },
  flex: {
    flex: 1,
  },
  container: {
    width: width,
    height: height * 0.85,
    alignSelf: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: width * 0.9,
    height: height * 0.8,
  },
});

export default MusicSheetScreen;
