import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

const Dashboard = () => {
  return (
    <View style={styles.background}>
      <Text style={styles.judul}>Smart {'\n'}GreenHouse</Text>
      <View style={styles.Kartu}>
          <View style={styles.tekskartu}>
            <View style={styles.grub}>
              <FontAwesome name="thermometer-half" size={24} color="black" style={styles.iconsuhu} />
              <Text style={styles.teks1}>Suhu</Text>
            </View>
            <Text style={styles.teks2}>50°C</Text>
          </View>
        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <MaterialIcons name="water" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Kelembapan</Text>
          </View>
          <Text style={styles.teks2}>50°C</Text>
        </View>
      </View>

      <View style={styles.Kartu}>
        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <Ionicons name="sunny" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Cahaya</Text>
          </View>
          <Text style={styles.teks2}>50°C</Text>
        </View>
        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <FontAwesome name="tint" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Aliran Air</Text>
          </View>
          <Text style={styles.teks2}>50°C</Text>
        </View>
      </View>

      <Image source={require("../assets/images/timun.png")} style={styles.timun} />
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#556b2f", // Warna latar belakang 
  },
  judul: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 40,
    marginTop: 40,
  },
  Kartu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginLeft: 40,
    marginTop: 40,
    marginRight: 40,
  },
  tekskartu: {
    width: 180,
    height: 100,
    backgroundColor: "#f5f5dc",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  teks1: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  teks2: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
  },
  iconsuhu: {
    marginBottom: 5,
  },
  grub: {
    flexDirection: "row",
    alignItems: "center",
  },
  timun: {
    width: 100,
    height: 100,
    position: "absolute",
    right: 40, 
    bottom: 20, 
  },
})

export default Dashboard