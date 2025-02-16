import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
export default function Index() {
  return (
    <View style={styles.background}>
      <Text>Aliran Air</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#556b2f", // Warna latar belakang 
  },
});