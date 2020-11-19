import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscribe) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { x, y, z } = data;
  //let pitch= Math.atan2(-x,Math.sqrt(y*y+z*z))*57.3;

  // x_angle 
  let x_result= Math.sqrt(y*y+z*z);
  x_result= x/x_result;
  let x_angle= Math.atan(x_result);

  //y_angle
  let y_result= Math.sqrt(x*x+z*z);
  y_result= y/y_result;
  let y_angle= Math.atan(y_result);

  //rad to deg
  let y_deg= y_angle*(180/Math.PI);

  let til='Increase';

  if(y_deg<18&&y_deg>14){
    til='optimal';
  }
  else if(y_deg<14){
    til='increase';
  }
  else {
    til= 'decrease';
  }

  return (
    <View style={styles.sensor}>
      
    
  <Text style={{
    alignItems: 'center',
    justifyContent:'center',
    fontSize: 148,
    color: 'gold',

  }}>  {Math.ceil(y_deg)}</Text>
  <Text style={{
    alignItems:"center",
    justifyContent:'center',
    fontSize: 72,
    fontWeight: 'bold',
  }}>   {til}</Text>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
});
