import React, { useState, useEffect } from 'react';
import {StyleSheet,View, Text, Button} from 'react-native';
import * as Location from 'expo-location';

export default function Home({navigation}){

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
  let optilt=0;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords);
    optilt=optimalTilt({location})
    console.log("optilt:");
    console.log(optilt);
  }
    
    const pressTilt = () =>{
        console.log("tilt pressed");
        navigation.navigate('Tilt');
    }
    const pressComp = () =>{
        console.log("compass pressed");
        navigation.navigate('Compass');
    }
    const pressMap = () =>{
        console.log("Map pressed");
        navigation.navigate('Map');
    }
    const pressNmap = () =>{
        console.log("new map pressed");
        navigation.navigate('Nmap');
    }
    console.log('new log')
    return (
        <View style= {styles.container}>
            <Text>HomeScreen</Text>
            <Button title= 'Go to Compass' onPress={pressComp} />
            <Button title= 'Go to Tilt' onPress= {pressTilt} />
            <Button title= 'Go to Map' onPress= {pressMap} />
            <Text>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
});

function optimalTilt({location}){
  console.log(location.coords);
  let lat= location.coords.latitude;
  let optilt=0;
  console.log(lat);
  if (lat<25){
    optilt= lat*0.87;
  }
  else {
    optilt= lat*0.76;
  }
  return({optilt});
}