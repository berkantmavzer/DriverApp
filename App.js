import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, ScrollView } from "react-native";
import MapView from "react-native-maps";

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <ScrollView>
      <View style={styles.title}>
        <Text style={{ textAlign: "right" }}> Share </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}> Toggle </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.aktiflik}>
          <Text>Aktiflik</Text>

          <Switch
            trackColor={{ false: "#767577", true: "#38c555" }}
            thumbColor={isEnabled ? "#fff" : "#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ height: 30 }}
          />
        </View>

        <View style={styles.mapcontainer}>
          <MapView style={styles.map} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 10,
    paddingBottom: 15,
  },

  container: {
    backgroundColor: "#f7f7f7",
  },
  aktiflik: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    padding: 10,
    marginTop: 30,
    width: "90%",
    margin: "auto",
  },
  mapcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 650,
  },
  map: {
    width: "80%",
    height: "90%",
  },
});
