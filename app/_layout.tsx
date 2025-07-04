import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="#29262e" />
      <Stack screenOptions={{
        headerShown: false, animation: "slide_from_right",
      }} />
    </>
  );
}
