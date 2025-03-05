import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

const CHANNEL_ID = "2842528"; // Ganti dengan Channel ID kamu
const READ_API_KEY = "KJOU5D3MV10GA84D"; // Ganti dengan API Key dari ThingSpeak

const SuhuChart = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Refresh grafik setiap 5 detik
    const interval = setInterval(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, 5000);

    return () => clearInterval(interval); // Membersihkan interval saat komponen tidak digunakan
  }, []);

  const THINGSPEAK_GRAPH_URL_1 = `https://thingspeak.com/channels/${CHANNEL_ID}/charts/1?api_key=${READ_API_KEY}&width=${width - 10}&height=400&bgcolor=%23ffffff&color=%23d62020&dynamic=true&time=${refreshKey}`;
  const THINGSPEAK_GRAPH_URL_2 = `https://thingspeak.com/channels/${CHANNEL_ID}/charts/2?api_key=${READ_API_KEY}&width=${width - 10}&height=400&bgcolor=%23ffffff&color=%2320d6d2&dynamic=true&time=${refreshKey}`;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grafik Suhu</Text>
      <WebView 
        key={refreshKey} 
        source={{ uri: THINGSPEAK_GRAPH_URL_1 }} 
        style={styles.webview} 
        javaScriptEnabled={true}
      />

      <Text style={styles.header}>Grafik Kelembaban</Text>
      <WebView 
        key={refreshKey + 1} 
        source={{ uri: THINGSPEAK_GRAPH_URL_2 }} 
        style={styles.webview} 
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
    width: width - 10, // Grafik lebih lebar
    height: 400, // Grafik lebih besar
    marginBottom: 20, // Jarak antar grafik
  },
});

export default SuhuChart;
