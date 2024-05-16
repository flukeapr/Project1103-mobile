import React, { createContext, useState, useEffect,useContext } from 'react';
import { Accelerometer } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';

const AccelerometerContext = createContext();


export const AccelerometerProvider = ({ children }) => {
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
          setIsPortrait(true)
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }else if(Math.abs(x)> threshold){
            setIsPortrait(false)
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
      };

  return (
    <AccelerometerContext.Provider value={{ data,isPortrait }}>
      {children}
    </AccelerometerContext.Provider>
  );
};

export const useAccelerometer = () => {
    return useContext(AccelerometerContext);
  };