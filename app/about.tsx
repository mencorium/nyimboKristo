import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Animated,
  Easing
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import EmailForm from "@/components/EmailForm";

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

export default function About() {
  const email = 'mwalyambijoel@gmail.com';
  const subject = 'Any Suggestions about the app';
  const body = 'Hello, I have an inquiry about...';
  const formUrl = 'https://forms.gle/your-google-form-link';

  const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Animation for scrolling effect
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient colors={["#121212", "#1E1E1E"]} style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile and Title Section */}
        <Animated.View style={[styles.profileContainer, { opacity: fadeAnim }]}>
          <Image source={require("@/assets/images/me.jpg")} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Mwalyambi, Joel I</Text>
            <Text style={styles.subtitle}>Tech Enthusiast | Music Visionary</Text>
          </View>
        </Animated.View>

        {/* Details Section */}
        <Animated.View style={[styles.detailsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.aboutText}>
            Mwalyambi, Joel I, a visionary developer and music artist, is the driving force behind several innovative projects spanning mobile development, 
            database optimization, and embedded systems. With expertise in React Native, Expo, and SQLite, he creates seamless digital experiences, 
            from intuitive mobile and desktop interfaces to Arduino-powered automation solutions. His dedication to efficiency and reliability ensures that his work is both cutting-edge and impactful.
          </Text>
          <Text style={styles.aboutText}>
            Beyond technology, Joel is deeply involved in music composition and arrangement, blending logic with artistry to craft expressive melodies. 
            His passion extends to exploring human behavior in vehicle communication systems, pushing the boundaries of innovation. 
            Whether developing software, structuring databases, or composing music, he strives to merge creativity with technical excellence, shaping solutions that resonate in both the digital and artistic realms.
          </Text>
        </Animated.View>

        {/* Inquiry Section */}
        <Animated.View style={[styles.inquiryContainer, { opacity: fadeAnim }]}>
          <Text style={styles.inquiryText}>Have any Suggestions? Reach out to me:</Text>
          <TouchableOpacity 
            onPress={() => handleLinkPress(emailUrl, 'Email client is not supported on this device.')} 
            style={styles.inquiryButton}
          >
            <Text style={styles.inquiryButtonText}>Send Email Inquiry</Text>
          </TouchableOpacity>
          {/* <EmailForm receiverEmail={email}/> */}

        </Animated.View>

        {/* Inspirational Quote */}
        <Animated.View style={[styles.inspirationalContainer, { opacity: fadeAnim }]}>
          <Text style={styles.inspirationalText}>
            "Without guidance from the Divine Master Creator, innovation and creativity will either be empty words or a disaster for humanity."
          </Text>
          <Text style={styles.signature}>— Mwalyambi Jr</Text>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© {new Date().getFullYear()} Mwalyambi Jr. All rights reserved.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "#bbb",
    borderWidth: 3,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    fontStyle: "italic",
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
    transform: [{ scale: 1 }],
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
});
