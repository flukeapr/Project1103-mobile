import { View, Text, PermissionsAndroid,Image,ActivityIndicator,FlatList, ScrollView ,RefreshControl} from 'react-native';
import React, { useState,useEffect,useCallback } from 'react';
import { Button,Icon } from '@rneui/base';
import Voice from 'react-native-voice';
import Tobtabs from './Tobtabs';
import { useUserAuth } from '../context/UserAuthenContext';
import { getDocs, collection, increment,doc,updateDoc,deleteDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export default function Cart() {
  
  

  return (
    <>
    <Tobtabs></Tobtabs>
    <View className="flex-1 justify-between items-center bg-white">
      <View>
    
      
      </View>
      <View className=' flex-row justify-between'>
      <Button   buttonStyle={{
                backgroundColor: '#D9D9D9',
                width: 210,
                height: 60,

              }}
              title={`ราคารวม .00 บาท`}
              titleStyle={{ color: '#CE4257',fontWeight:'bold' }}></Button>
    
      <Button  buttonStyle={{
                backgroundColor: '#720026',
                width: 210,
                height: 60,
              }}
              titleStyle={{ color: 'white',fontWeight:'bold' }}
              title={"ชำระเงิน"} 
              iconRight={true} 
              icon={<Image source={require('../../assets/payment.png')}
               style={{width:30,height:30,marginLeft:8,borderRadius:5}}
               />}></Button>
      </View>
     
    </View>
    
    </>
    
  )
}
