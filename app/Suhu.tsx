import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Informasi dari ThingSpeak
const CHANNEL_ID = "2842528"; // Ganti dengan Channel ID Anda
const FIELD_ID = 1; // Field yang ingin ditampilkan, sesuaikan dengan suhu
const THINGSPEAK_GRAPH_URL = `https://thingspeak.com/channels/${CHANNEL_ID}/charts/${FIELD_ID}?width=auto&height=300&bgcolor=%23ffffff&color=%23d62020&dynamic=true`;

const Suhu = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grafik Suhu</Text>
      <WebView source={{ uri: THINGSPEAK_GRAPH_URL }} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#556b2f",
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  webview: {
    width: width - 40,
    height: 300,
  },
});

export default Suhu;
