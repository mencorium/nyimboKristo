import React, { useState } from "react";
import {  Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import EkiliRelay from "ekilirelay";
import { LinearGradient } from "expo-linear-gradient";

const mailer = new EkiliRelay(process.env.RELAY_API_KEY);

export default function EmailForm({ receiverEmail }:{receiverEmail:string}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (!name || !email || !message) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await mailer.sendEmail(
        receiverEmail,
        `Contact Form Message from ${name}`,
        `Sender: ${name} (${email})\n\nMessage:\n${message}`,
        `From: ${name} <${email}>`
      );

      if (response.status === "success") {
        Alert.alert("Success", "Email sent successfully.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        Alert.alert("Failed", `Failed to send email: ${response.message}`);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while sending the email.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <LinearGradient colors={["#121212", "#1E1E1E"]} style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Message"
        placeholderTextColor="#aaa"
        multiline
        numberOfLines={5}
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity onPress={handleSendEmail} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Sending..." : "Send Message"}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#2A2A2A",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
