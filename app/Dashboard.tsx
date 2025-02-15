import { View, Text, StyleSheet, Image, Dimensions, Switch } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window'); // Get the screen width and height

const Dashboard = () => {
  const [isPumpOn, setIsPumpOn] = useState(false); // State untuk tombol on/off

  return (
    <View style={styles.background}>
      <Text style={styles.judul}>Smart {'\n'}GreenHouse</Text>

      <View style={styles.Kartu}>
        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <FontAwesome name="thermometer-half" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Suhu</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 8 }}>
              <Text style={styles.teks3}>79.00 %</Text>
              <Text style={styles.teks3}>50.00 °C</Text>
            </View>
            <Text style={styles.teks3}> | </Text>
            <Text style={styles.teks3}> 84.74 °F</Text>
          </View>
        </View>

        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <MaterialIcons name="water" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Kelembapan</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.teks2}>50 </Text>
            <Text style={styles.teks2}> | </Text>
            <Text style={styles.teks2}>50 %</Text>
          </View>
        </View>
      </View>

      <View style={styles.Kartu}>
        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <Ionicons name="sunny" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Cahaya</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.teks2}>50</Text>
            <Text style={styles.teks2}> | </Text>
            <Text style={styles.teks2}>50 %</Text>
          </View>
        </View>

        <View style={styles.tekskartu}>
          <View style={styles.grub}>
            <FontAwesome name="tint" size={24} color="black" style={styles.iconsuhu} />
            <Text style={styles.teks1}>Aliran Air</Text>
          </View>
          <Text style={styles.teks2}>0.00 L/min</Text>
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

      <Image source={require("../assets/images/timun.png")} style={styles.timun} />
    </View>
  );
}

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
    height: 120,
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
    marginTop: 20,
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
