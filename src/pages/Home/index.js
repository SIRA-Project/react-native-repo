import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView from 'react-native-maps'
import CurrentPostion from '../../components/CurrentPosition'
import MyMap from '../../components/MyMap'
import MyPicker from '../../components/MyPicker'
import TestCamera from '../../components/TestCamera'

const Home = () => {
  const [isMap, setIsMap] = useState(false);

  const handleActiveMap = () => {
    setIsMap(!isMap);
  }

  return isMap ? (
    <View style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <View style={{
        width: '100%', height: 70,
        position: 'absolute', bottom: 32, left: 0,
        justifyContent: 'center', alignItems: 'center',
        zIndex: 15
      }}>
        <TouchableOpacity style={{
          width: 70, height: 70,
          backgroundColor: 'white',
          borderRadius: 60,
          elevation: 3,
          justifyContent: 'center', alignItems: 'center'
        }} onPress={handleActiveMap}>
          <Text style={{
            fontSize: 26,
            marginBottom: 8
          }}>📷</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : <MyPicker />
}

export default Home

// const styles = StyleSheet.create({})
