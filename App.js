import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
  Share,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  // switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // map marker

  const [mapRegion, setMapRegion] = useState({
    latitude: 41.0369,
    longitude: 28.9858,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // map location

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Konum Erişimi Engellendi");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);

    sharedLocation = console.log(userLocation);
  };

  useEffect(() => {
    userLocation();
  }, []);

  // share

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Current Location :)",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.title}>
        <TouchableOpacity onPress={onShare}>
          <Text style={{ textAlign: "right" }}>Share</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}> Toggle </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.status}>
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

        <View style={styles.mapContainer}>
          <MapView style={styles.map} region={mapRegion}>
            <Marker coordinate={mapRegion} title="Marker" />
          </MapView>

          <Button title="Konumum" onPress={userLocation} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 10,
    paddingVertical: 25,
  },

  button: {
    width: 25,
  },

  container: {
    backgroundColor: "#f7f7f7",
  },
  status: {
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
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 650,
    width: "100%",
  },
  map: {
    width: Dimensions.get("screen").width > 500 ? "70%" : "80%",
    height: (Dimensions.get("screen").height = "90%"),
  },
});
