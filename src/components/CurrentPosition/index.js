import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Button } from "react-native";
import requestLocationPermission from '../../premissions/Location';

navigator.geolocation = require('@react-native-community/geolocation');

const CurrentPostion = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [counter, setCounter] = useState(0);

  const getPostion = () => {
    requestLocationPermission();
    navigator.geolocation.watchPosition(postion => {
      const {latitude, longitude, speed} = postion.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setSpeed(speed);
    }, 
      error => alert(error.message),
      { timeout: 20000, maximumAge: 1000 }
    )
  }

  useEffect(() => {
    getPostion();
    setCounter(counter + 1);
  }, [latitude]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     getPostion();
  //     setCounter(counter + 1);
  //   }, 5000)
  // }, [counter])

  return (
    <View>
      <Text style={styles.big}>CurrentPostion</Text>
      <Text style={styles.big}>Longitude: {longitude} </Text>
      <Text style={styles.big}>Latitude: {latitude} </Text>
      <Text style={styles.big}>Speed: {speed} </Text>
      <Text style={styles.big}>Interval: {counter} </Text>
      <View style={{marginBottom: 48}} />
      <Button title="Get Position" onPress={getPostion} />
    </View>
  )
}

export default CurrentPostion

const styles = StyleSheet.create({
  big: {
    fontSize: 28
  }
})
