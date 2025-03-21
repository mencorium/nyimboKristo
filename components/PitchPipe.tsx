import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import getPipeColor from '@/utils/getPipeColor';
import getPipeSounds from '@/utils/getPipeSounds';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface PitchPipeProps {
  songTitle: string;
  songKey: string;
  flatKey: boolean;
}

const PitchPipe: React.FC<PitchPipeProps> = ({ songTitle, songKey, flatKey }) => {
  const { width } = useWindowDimensions();
  const [pitchSound, setPitchSound] = useState<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Animation for button press
  const scale = useSharedValue(1);

  // Memoized path for pitch sound
  const pitchPipePath = useMemo(() => getPipeSounds(songKey, flatKey), [songKey, flatKey]);

  // Memoized container style
  const containerStyle = useMemo(() => ({
    ...styles.container,
    left: Math.min(width - 90, width * 0.85),
    backgroundColor: getPipeColor(songTitle),
  }), [width, songTitle]);

  // Animated style for button press
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Play sound
  const playPitchSound = useCallback(async () => {
    if (!pitchPipePath) return;

    try {
      setIsLoading(true);
      setError(null);

      // Haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Animate button press
      scale.value = withTiming(0.9, { duration: 100 }, () => {
        scale.value = withTiming(1, { duration: 100 });
      });

      // Load and play sound
      const { sound } = await Audio.Sound.createAsync(pitchPipePath);
      setPitchSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error loading sound:', error);
      setError('Failed to play sound. Please try again.');
    } finally {
      setIsLoading(false);
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
    <Animated.View style={[containerStyle, animatedStyle]}>
      <Pressable
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
        onPress={playPitchSound}
        accessibilityLabel={`Play pitch pipe for ${songKey}${flatKey ? ' flat' : ''}`}
        accessibilityRole="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Text style={styles.text}>Key</Text>
            <Text style={styles.text}>
              {songKey} {flatKey && <Text style={styles.flatSymbol}>♭</Text>}
            </Text>
          </>
        )}
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
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
  pressable: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default PitchPipe;