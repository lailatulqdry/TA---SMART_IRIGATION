import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from 'expo-router';

const CHANNEL_ID = "2842528";
const API_KEY = "KJOU5D3MV10GA84D";
const WRITE_API_KEY = "UFWK1ZM1368TGLG0";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    suhu1: 0,
    suhu2: 0,
    kelembapan1: 0,
    kelembapan2: 0,
    cahaya1: 0,
    cahaya2: 0,
    aliranAir: 0,
  });

  const [isPumpOn, setIsPumpOn] = useState(false);

  const fetchSensorData = async () => {
    try {
      const response = await axios.get(
        `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}&results=1`
      );

      const latestData = response.data.feeds[0];
      setSensorData({
        suhu1: latestData.field1,
        suhu2: latestData.field2,
        kelembapan1: latestData.field3,
        kelembapan2: latestData.field4,
        cahaya1: latestData.field5,
        cahaya2: latestData.field6,
        aliranAir: latestData.field7,
      });

      setIsPumpOn(latestData.field8 === 1);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk menghidupkan/mematikan pompa
  const togglePump = async () => {
    const newPumpStatus = !isPumpOn ? 1 : 0; // 1 = ON, 0 = OFF
    setIsPumpOn(!isPumpOn); // Ubah state lokal dulu untuk UI responsif

    try {
      await axios.get(
        `https://api.thingspeak.com/update?api_key=${WRITE_API_KEY}&field8=${newPumpStatus}`
      );
      console.log(`Pompa ${newPumpStatus === 1 ? "ON" : "OFF"} berhasil diperbarui di ThingSpeak`);
    } catch (error) {
      console.error("Gagal mengupdate status pompa:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 15000);
    return () => clearInterval(interval);
  }, []);

  const router = useRouter();

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.background}>
        <Text style={styles.judul}>Smart {'\n'}GreenHouse</Text>

        <View style={styles.KartuBaris}>
          <View style={styles.Kartu}>
            <View style={styles.tekskartu}>
              <View style={styles.grub}>
                <FontAwesome name="thermometer-half" size={20} color="black" style={styles.iconsuhu} />
                <Text style={styles.teks1}>Suhu</Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/Suhu')}>
                <Text style={styles.teks2}>{sensorData.suhu1} %  </Text>
                <Text style={styles.teks2}>{sensorData.suhu2} °C </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Kartu}>
            <View style={styles.tekskartu}>
              <View style={styles.grub}>
                <MaterialIcons name="water" size={20} color="black" style={styles.iconsuhu} />
                <Text style={styles.teks1}>Kelembapan</Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/Kelembapan')}>
                <Text style={styles.teks2}>{sensorData.kelembapan1} RAW </Text>
                <Text style={styles.teks2}>{sensorData.kelembapan2} % </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.KartuBaris}>
          <View style={styles.Kartu}>
            <View style={styles.tekskartu}>
              <View style={styles.grub}>
                <Ionicons name="sunny" size={20} color="black" style={styles.iconsuhu} />
                <Text style={styles.teks1}>Cahaya</Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/Cahaya')}>
                <Text style={styles.teks2}>{sensorData.cahaya1} RAW</Text>
                <Text style={styles.teks2}>{sensorData.cahaya2} %</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Kartu}>
            <View style={styles.tekskartu}>
              <View style={styles.grub}>
                <FontAwesome name="tint" size={20} color="black" style={styles.iconsuhu} />
                <Text style={styles.teks1}>Aliran Air</Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/AliranAir')}>
                <Text style={styles.teks2}>{sensorData.aliranAir} L/min</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.switch1}>
          <Text style={styles.switchnama}>Pompa Air</Text>
          <Switch
              value={isPumpOn}
              onValueChange={togglePump} // Memanggil fungsi togglePump() untuk memperbarui ThingSpeak
              trackColor={{ false: "#767577", true: "#ffffff" }}
              thumbColor={isPumpOn ? "#f5dd4b" : "#f4f3f4"}
          />
          <Text style={[styles.pumpStatus, { color: isPumpOn ? "#f5f5dc" : "red" }]}>
            {isPumpOn ? "Pompa ON" : "Pompa OFF"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#556b2f",
  },
  background: {
    flex: 1,
    backgroundColor: "#556b2f",
    padding: 20,
  },
  judul: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 40,
  },
  KartuBaris: {
    flexDirection: "row",
    justifyContent: "space-evenly", 
    marginBottom: 20,
    marginTop: 15,
  },  
  Kartu: {
    width: 135,
    height: 135,
  },
  tekskartu: {
    backgroundColor: "#f5f5dc",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  teks1: {
    fontSize: 16,
    color: "#333",
  },
  teks2: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  iconsuhu: {
    marginBottom: 5,
  },
  grub: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  switch1: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 5,
  },
  switchnama: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  pumpStatus: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default Dashboard;
