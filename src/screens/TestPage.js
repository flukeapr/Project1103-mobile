import { View, Text ,StyleSheet,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import * as ScreenOrientation  from 'expo-screen-orientation'

export default function TestPage() {
 
    const [data ,setData]= useState({
      x:0,
      y:0,
      z:0
    });
    const [isPortrait,setIsPortrait] = useState(true);
    useEffect(()=>{
      const subscription =Accelerometer.addListener(accelerometerData =>{
        setData(accelerometerData);
        handleOrientationChange(accelerometerData)
      })
      Accelerometer.setUpdateInterval(1000);
      return ()=> subscription && subscription.remove();

    },[])

    const handleOrientationChange = ({x,y}) =>{
      const threshold = 0.5;
      if(Math.abs(y)>threshold){
        setIsPortrait(true);
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }else if(Math.abs(x)> threshold){
        setIsPortrait(false);
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
    };

  
  return (
    
      <View style={styles.container}>
      <Text style={styles.text}>Accelerometer Data:</Text>
      <Text style={styles.text}>x: {data.x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {data.y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {data.z.toFixed(2)}</Text>
      <View style={isPortrait ? styles.portrait : styles.landscape}>
        <Text style={styles.modeText}>
          {isPortrait ? 'Portrait Mode' : 'Landscape Mode'}
        </Text>
      </View>
    </View>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
  portrait: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    backgroundColor: '#CE4257',
    justifyContent: 'center',
    alignItems: 'center',
  },
  landscape: {
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#720026',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeText: {
    color: '#fff',
    fontSize: 24,
  },
});