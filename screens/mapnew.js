import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import 'react-native-gesture-handler';

export default function Nmap() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  //let lat= location.latitude;

  return (
    <MapView 
                style= {{flex:1}}
                initialRegion={{
                    //latitude:location.coords.latitude,
                    //longitude:location.coords.longitude,
                    latitudeDelta:0.0922,
                    longitudeDelta:0.00421,
                }}
            />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});