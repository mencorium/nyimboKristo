import React, { useRef, useMemo, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  RefreshControl,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import EmailForm from "@/components/EmailForm";

const { width } = Dimensions.get("window");

// Utility function to handle link press
const handleLinkPress = async (url: string, errorMessage: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert(errorMessage);
    }
  } catch (error) {
    console.error(`Failed to open URL: ${errorMessage}`, error);
  }
};

const About = React.memo(() => {
  const email = "mwalyambijoel@gmail.com";
  const subject = "Any Suggestions about the app";
  const body = "Hello, I have an inquiry about...";
  const formUrl = "https://forms.gle/your-google-form-link";

  const emailUrl = useMemo(
    () => `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    [email, subject, body]
  );

  // Shared value for scroll position
  const scrollY = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animated styles for profile image
  const profileImageStyle = useAnimatedStyle(() => {
    const size = withTiming(
      interpolate(scrollY.value, [0, 100], [120, 60], {
        extrapolateRight: "clamp",
      }),
      { duration: 200, easing: Easing.ease }
    );
    const borderWidth = withTiming(
      interpolate(scrollY.value, [0, 100], [3, 1], {
        extrapolateRight: "clamp",
      }),
      { duration: 200, easing: Easing.ease }
    );
    return {
      width: size,
      height: size,
      borderWidth,
    };
  });

  // Animated styles for title
  const titleStyle = useAnimatedStyle(() => {
    const fontSize = withTiming(
      interpolate(scrollY.value, [0, 100], [32, 18], {
        extrapolateRight: "clamp",
      }),
      { duration: 200, easing: Easing.ease }
    );
    return {
      fontSize,
    };
  });

  // Animated styles for subtitle
  const subtitleStyle = useAnimatedStyle(() => {
    const fontSize = withTiming(
      interpolate(scrollY.value, [0, 100], [18, 14], {
        extrapolateRight: "clamp",
      }),
      { duration: 200, easing: Easing.ease }
    );
    return {
      fontSize,
    };
  });

  // Animated styles for profile container padding
  const profileContainerStyle = useAnimatedStyle(() => {
    const paddingVertical = withTiming(
      interpolate(scrollY.value, [0, 100], [20, 10], {
        extrapolateRight: "clamp",
      }),
      { duration: 200, easing: Easing.ease }
    );
    const paddingHorizontal = withTiming(
      interpolate(scrollY.value, [0, 100], [20, 10], {
        extrapolateRight: "clamp",
      }),
      { duration: 200, easing: Easing.ease }
    );
    return {
      paddingVertical,
      paddingHorizontal,
    };
  });

  // Scroll-to-top function
  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Haptic feedback
  }, []);

  // Pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000); // Simulate refresh
  }, []);

  return (
    <LinearGradient colors={["#121212", "#1E1E1E"]} style={styles.container}>
      <StatusBar style="light" />

      {/* Fixed Profile Section */}
      <Animated.View style={[styles.profileContainer, profileContainerStyle]}>
        <Animated.Image
          source={require("@/assets/images/me.jpg")}
          style={[styles.profileImage, profileImageStyle]}
        />
        <View style={styles.textContainer}>
          <Animated.Text style={[styles.title, titleStyle]}>
            Mwalyambi, Joel I
          </Animated.Text>
          <Animated.Text style={[styles.subtitle, subtitleStyle]}>
            Tech Enthusiast | Music Visionary
          </Animated.Text>
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.aboutText}>
            Mwalyambi, Joel I, a visionary developer and music artist, is the
            driving force behind several innovative projects spanning mobile
            development, database optimization, and embedded systems. With
            expertise in React Native, Expo, and SQLite, he creates seamless
            digital experiences, from intuitive mobile and desktop interfaces to
            Arduino-powered automation solutions. His dedication to efficiency
            and reliability ensures that his work is both cutting-edge and
            impactful.
          </Text>
          <Text style={styles.aboutText}>
            Beyond technology, Joel is deeply involved in music composition and
            arrangement, blending logic with artistry to craft expressive
            melodies. His passion extends to exploring human behavior in vehicle
            communication systems, pushing the boundaries of innovation. Whether
            developing software, structuring databases, or composing music, he
            strives to merge creativity with technical excellence, shaping
            solutions that resonate in both the digital and artistic realms.
          </Text>
        </View>

        {/* Inquiry Section */}
        <View style={styles.inquiryContainer}>
          <Text style={styles.inquiryText}>
            Have any Suggestions? Reach out to me:
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleLinkPress(
                emailUrl,
                "Email client is not supported on this device."
              );
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Haptic feedback
            }}
            style={styles.inquiryButton}
          >
            <Text style={styles.inquiryButtonText}>Send Email Inquiry</Text>
          </TouchableOpacity>
          {/* <EmailForm receiverEmail={email}/> */}
        </View>

        {/* Inspirational Quote */}
        <View style={styles.inspirationalContainer}>
          <Text style={styles.inspirationalText}>
            "Without guidance from the Divine Master Creator, innovation and
            creativity will either be empty words or a disaster for humanity."
          </Text>
          <Text style={styles.signature}>— Mwalyambi Jr</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Mwalyambi Jr. All rights reserved.
          </Text>
        </View>
      </Animated.ScrollView>

      {/* Floating Action Button (Scroll-to-Top) */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={scrollToTop}
      >
        <Feather name="arrow-up" size={24} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    backgroundColor: "#121212",
    zIndex: 1,
  },
  profileImage: {
    borderRadius: 60,
    borderColor: "#bbb",
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#ccc",
    fontStyle: "italic",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 120,
  },
  detailsContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  aboutText: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 15,
    lineHeight: 24,
  },
  inquiryContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    marginBottom: 40,
  },
  inquiryText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  inquiryButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  inquiryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  inspirationalContainer: {
    marginTop: 30,
    paddingHorizontal: 15,
    borderLeftWidth: 4,
    borderColor: "#888",
    marginBottom: 50,
  },
  inspirationalText: {
    fontSize: 20,
    color: "#fff",
    fontStyle: "italic",
    lineHeight: 30,
    marginBottom: 10,
  },
  signature: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "right",
  },
  footer: {
    marginTop: 50,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default About;