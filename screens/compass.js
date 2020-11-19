import React from 'react';
import {StyleSheet,View,ImageBackground,Image,Animated,Text, TouchableOpacity} from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { set } from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';

export default function Compass() {
    const [data, setData] = React.useState({
      x: 0,
      y: 0,
      z: 0,
    });
    const [subscription, setSubscription] = React.useState(null);
    
  
    React.useEffect(() => {
      _toggle();
      return () => {
        _unsubscribe();
      };
    }, []);
  
    const _toggle = () => {
      if (subscription) {
        _unsubscribe();
      } else {
        _subscribe();
      }
    };
  
    const _slow = () => {
      Magnetometer.setUpdateInterval(1000);
    };
  
    const _fast = () => {
      Magnetometer.setUpdateInterval(16);
    };
  
    const _subscribe = () => {
      setSubscription(
        Magnetometer.addListener(result => {
          setData(result);
        })
      );
    };
  
    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
    };
  
    const { x, y, z } = data;
    Magnetometer.setUpdateInterval(16);

    let theta= "0rad";
    //console.log("Primary theta:");
    //console.log(theta);
    theta= Math.atan(x/y);
    
    if(Math.atan2(y,x)>=0){
        theta=Math.atan2(y,x)*(180/Math.PI);
    }
    else{
        theta=(Math.atan2(y,x)+2*Math.PI)*(180/Math.PI);
    }
    theta-=90;
    theta+="deg";
    let suggestmove="";
    //setData('../assets/icons8-reply-arrow-48.png');
    let imgsr='../assets/icons8-reply-arrow-48.png';
    if(x>5){
      suggestmove="left";
      //setData('../assets/icons8-reply-arrow-48.png');
      imgsr='../assets/icons8-reply-arrow-48.png';
    }
    else if(x<-5){
      suggestmove="right";
      //setData('../assets/icons8-forward-arrow-96');
      imgsr='../assets/icons8-forward-arrow-96';
    }
    else{
      suggestmove="correct";
      imgsr='../assets/—Pngtree—tick vector icon_3722540.png'
    }
    //console.log("returnable theta:");
    //console.log(theta);
    return (
      <View style={{
        flex:1,
      }
      }>
      <View style={styles.sensor}>
      <Text>x: {round(x)}; y: {round(y)}</Text>
        
        
          
          <Animated.Image
            source={require('../assets/compass.png')}
            style={{width:500, height:500,transform:[{rotate:theta}],}}
            />
            
        
      </View>
      <View style={{
        flex:0.1,
        alignItems:'center',
        height:50,
        width:50,
      }}>
        <Text>{suggestmove}</Text>
      </View>
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
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#3C3C3C',
    },
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
      //marginTop: 15,
      //paddingHorizontal: 10,
      //backgroundColor:'#3C3C3C',
      flex:0.9,
      alignItems:'center',
      justifyContent:'center',
    },
  });