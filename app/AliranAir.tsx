import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

const CHANNEL_ID = "2842528"; // Ganti dengan Channel ID kamu
const FIELD_ID = 6; // Sesuaikan dengan field yang ingin ditampilkan
const READ_API_KEY = "KJOU5D3MV10GA84D"; // Ganti dengan API Key dari ThingSpeak

const THINGSPEAK_GRAPH_URL = `https://thingspeak.com/channels/${CHANNEL_ID}/charts/${FIELD_ID}?api_key=${READ_API_KEY}&width=${width - 40}&height=300&bgcolor=%23ffffff&color=%23d62020&dynamic=true`;

const AliranAirChart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grafik Aliran Air</Text>
      <WebView source={{ uri: THINGSPEAK_GRAPH_URL }} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f4f4f",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
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

export default AliranAirChart;
