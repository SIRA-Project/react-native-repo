import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import requestLocationPermission from '../../premissions/Location'

navigator.geolocation = require('@react-native-community/geolocation');

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
}

const MyMap = () => {
  const [curentPosition, setCurentPosition] = useState(initialState);
  const handlePositionChange = () => {
    requestLocationPermission();
    navigator.geolocation.watchPosition(postion => {
      const { latitude, longitude } = postion.coords;
      setCurentPosition({
        ...curentPosition,
        latitude,
        longitude,
      })
    });
  }

  useEffect(() => {
    handlePositionChange();
  }, [])

  return curentPosition.latitude ? (
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      initialRegion={curentPosition}
      showsUserLocation
    >
      <Marker
        coordinate={{
          latitude: -6.812231018913551, 
          longitude: 107.61819249656175
        }}
        title="Apotek Lembang Farma"
        description="Telp.(022)888833322"
      >
      </Marker>
    </MapView>
  ) : <ActivityIndicator style={{flex: 1}} animating size="large" />
}

export default MyMap

const styles = StyleSheet.create({
  map: {
    height: '100%',
  }
})
