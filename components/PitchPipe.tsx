import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import getPipeColor from '@/utils/getPipeColor';
import getPipeSounds from '@/utils/getPipeSounds';

interface PitchPipeProps {
  songTitle: string;
  songKey: string;
  flatKey: boolean;
}

const PitchPipe: React.FC<PitchPipeProps> = ({ songTitle, songKey, flatKey }) => {
  const { width } = useWindowDimensions();
  const [pitchSound, setPitchSound] = useState<Audio.Sound | null>(null);

  // Memoized path for pitch sound
  const pitchPipePath = useMemo(() => getPipeSounds(songKey, flatKey), [songKey, flatKey]);

  // Memoized container style
  const containerStyle = useMemo(() => ({
    ...styles.container,
    left: Math.min(width - 90, width * 0.85),
    backgroundColor: getPipeColor(songTitle),
  }), [width, songTitle]);

  // Play sound
  const playPitchSound = useCallback(async () => {
    if (!pitchPipePath) return;

    try {
      console.log('Loading sound');
      const { sound } = await Audio.Sound.createAsync(pitchPipePath);
      await sound.playAsync();
      setPitchSound(sound);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  }, [pitchPipePath]);

  // Cleanup the sound on component unmount
  useEffect(() => {
    return () => {
      if (pitchSound) {
        console.log('Unloading sound');
        pitchSound.unloadAsync().catch(console.error);
      }
    };
  }, [pitchSound]);

  return (
    <Pressable 
      style={({ pressed }) => [containerStyle, pressed && styles.pressed]}
      onPress={playPitchSound}
      accessibilityLabel={`Play pitch pipe for ${songKey}${flatKey ? ' flat' : ''}`}
    >
      <Text style={styles.text}>Key</Text>
      <Text style={styles.text}>
        {songKey} {flatKey && <Text style={styles.flatSymbol}>♭</Text>}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80, 
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: 40, 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  flatSymbol: {
    fontSize: 14,
    lineHeight: 18,
  },
  pressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default PitchPipe;
