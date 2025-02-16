import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Switch, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from 'expo-router';

const { width } = Dimensions.get("window");

// informasi dari ThingSpeak
const CHANNEL_ID = "2842528"; //  Channel ID Anda
const API_KEY = "KJOU5D3MV10GA84D"; //  Read API Key Anda

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    suhu1: 0,
    suhu2: 0,
    suhu3: 0,
    kelembapan1: 0,
    kelembapan2: 0,
    cahaya1: 0,
    cahaya2: 0,
    aliranAir: 0,
  });

  const [isPumpOn, setIsPumpOn] = useState(false);

  // Fungsi Fetch Data dari ThingSpeak
  const fetchSensorData = async () => {
    try {
      const response = await axios.get(
        `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}&results=1`
      );

      const latestData = response.data.feeds[0];

      setSensorData({
        suhu1: latestData.field1, //  field sensor di ThingSpeak
        suhu2: latestData.field2,
        suhu3: latestData.field3,
        kelembapan1: latestData.field4,
        kelembapan2: latestData.field5,
        cahaya1: latestData.field6,
        cahaya2: latestData.field7,
        aliranAir: latestData.field8,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data setiap 15 detik
  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 15000);
    return () => clearInterval(interval);
  }, []);

  const router = useRouter();

  return (
    <View style={styles.background}>
      <Text style={styles.judul}>Smart {"\n"}GreenHouse</Text>

      <View style={styles.Kartu}>
        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <FontAwesome name="thermometer-half" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Suhu</Text>
          </View>
            <TouchableOpacity onPress={() => router.push('/Suhu')}>
              <Text style={styles.teks2}>{sensorData.suhu1} %  </Text>
              <Text style={styles.teks2}>{sensorData.suhu2} °C </Text>
              <Text style={styles.teks2}>{sensorData.suhu3} °F</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <MaterialIcons name="water" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Kelembapan</Text>
          </View>
            <TouchableOpacity onPress={() => router.push('/Kelembapan')}>
              <Text style={styles.teks2}>{sensorData.kelembapan1} RAW </Text>
              <Text style={styles.teks2}>{sensorData.kelembapan2} % </Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Kartu}>
        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <Ionicons name="sunny" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Cahaya</Text>
          </View>
            <TouchableOpacity onPress={() => router.push('/Cahaya')}>
              <Text style={styles.teks2}>{sensorData.cahaya1} RAW</Text>
              <Text style={styles.teks2}>{sensorData.cahaya2} %</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <FontAwesome name="tint" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Aliran Air</Text>
          </View>
            <TouchableOpacity onPress={() => router.push('/AliranAir')}>
              <Text style={styles.teks2}>{sensorData.aliranAir} L/min</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* Tombol On/Off */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Pompa Air</Text>
        <Switch
          value={isPumpOn}
          onValueChange={() => setIsPumpOn(!isPumpOn)}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPumpOn ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#556b2f",
    paddingHorizontal: 20,
  },
  judul: {
    fontSize: width < 375 ? 18 : 20,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 40,
  },
  Kartu: {
    flexDirection: width < 375 ? 'column' : 'row',
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 40,
  },
  tekskartu: {
    width: width < 375 ? '100%' : 180,
    height: 150,
    backgroundColor: "#f5f5dc",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: width < 375 ? 15 : 0,
  },
  teks1: {
    marginLeft: 15,
    fontSize: width < 375 ? 14 : 16,
    color: "#333",
  },
  teks2: {
    fontSize: width < 375 ? 25 : 18,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  teks3: {
    fontSize: width < 375 ? 25 : 15,
    fontWeight: "bold",
    marginTop: 8,
  },
  iconsuhu: {
    marginBottom: 5,
  },
  grub: {
    flexDirection: "row",
    alignItems: "center",
  },
  timun: {
    width: width < 375 ? 80 : 150,
    height: width < 375 ? 80 : 150,
    position: "absolute",
    right: 40,
    bottom: 60,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5dc",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Dashboard;
