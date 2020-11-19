import React, {Component, useState} from 'react';
import {StyleSheet,View, Text} from 'react-native';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
//import { Component } from 'react';

global.location=null

async function alertForLocation (){
    console.log('inside alert');
    
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('after permission check');
    if (status !== 'granted') {
        alert('Please enable locations');
  } 
    else{
        console.log('inside else');
        location= await Location.getCurrentPositionAsync({});
        console.log('s1');
        console.log('Location permission');
        //console.log(location);
        //setLocation({local});
    }

}


export default function Map () {
        console.log('line 1');
        alertForLocation();
        if(!location){
            console.log("No Location");
                return (<View/>);
            
        }
        console.log(location.coords.longitude);
        return(
            <MapView 
                style= {{flex:1}}
                initialRegion={{
                    latitude:location.coords.latitude,
                    longitude:location.coords.longitude,
                    latitudeDelta:0.0922,
                    longitudeDelta:0.00421,
                }}
            />
            
        )
    
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
});