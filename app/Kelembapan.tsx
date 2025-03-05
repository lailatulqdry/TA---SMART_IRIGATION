import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

const CHANNEL_ID = "2842528"; // Ganti dengan Channel ID kamu
const READ_API_KEY = "KJOU5D3MV10GA84D"; // Ganti dengan API Key dari ThingSpeak

const THINGSPEAK_GRAPH_URL_3 = `https://thingspeak.com/channels/${CHANNEL_ID}/charts/3?api_key=${READ_API_KEY}&width=${width - 10}&height=500&bgcolor=%23ffffff&color=%23d62020&dynamic=true`;
const THINGSPEAK_GRAPH_URL_4 = `https://thingspeak.com/channels/${CHANNEL_ID}/charts/4?api_key=${READ_API_KEY}&width=${width - 10}&height=500&bgcolor=%23ffffff&color=%2320d6d2&dynamic=true`;

const KelembapanChart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grafik Soil Moisture</Text>
      <WebView 
        source={{ uri: THINGSPEAK_GRAPH_URL_3 }} 
        style={styles.webview} 
        scalesPageToFit={true}
        javaScriptEnabled={true}
      />

      <Text style={styles.header}>Grafik Soil Percent</Text>
      <WebView 
        source={{ uri: THINGSPEAK_GRAPH_URL_4 }} 
        style={styles.webview} 
        scalesPageToFit={true}
        javaScriptEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f4f4f",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  webview: {
    width: width - 5, // Lebih lebar untuk memenuhi layar
    height: 500, // Grafik lebih tinggi
    marginBottom: 30, // Jarak antar grafik
  },
});

export default KelembapanChart;
