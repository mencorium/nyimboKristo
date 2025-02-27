import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

interface EllipsisHiddenPageProps {
  isPopupVisible: boolean;
  onClosePopup: () => void;
}

const EllipsisHiddenPage: React.FC<EllipsisHiddenPageProps> = ({ isPopupVisible, onClosePopup }) => {
  const router = useRouter();
  const handleOutsideClick = () => {
    // Close popup if tapped outside
    onClosePopup();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <View style={styles.container}>
        {isPopupVisible && (
          <View style={styles.popUp}>
            <TouchableOpacity onPress={() => router.push("/about")}>
              <Text style={styles.popUpText}>About us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClosePopup}>
              <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUp: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "absolute",
    width: 200,
    borderRadius: 10,
    height: 100,
    top: 10,
    right: 20,
    zIndex: 2, // Ensures this popup is above other content
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow effect
  },
  popUpText: {
    fontSize: 18,
    marginBottom: 10,
  },
  exitText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EllipsisHiddenPage;

/* bado popup inasumbua, nataka ikipress other part ijifunge hili bado sijaweza */
