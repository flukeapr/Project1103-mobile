import { View, Text, PermissionsAndroid,Image } from 'react-native';
import React, { useState } from 'react';
import { Button } from '@rneui/base';
import Voice from 'react-native-voice';
import Tobtabs from './Tobtabs';

export default function Cart() {
  const [results, setResults] = useState('');
  const [error, setError] = useState('');

  async function requestMicrophonePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone so you can record audio',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the microphone');
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  Voice.onSpeechError = (error) => {
    setError(error);
    console.log(error);
  }

  Voice.onSpeechResults = (event) => {
    setResults(event?.value?.[0]);
    console.log(event?.value?.[0]);
  }

  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechStart = () => setIsRecording(true);

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log(error);
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <>
    <Tobtabs></Tobtabs>
    <View className="flex-1 justify-between items-center bg-white">
      
      <View>
      <Button onPress={startRecording}>Record</Button>
      <Button onPress={stopRecording}>StopRecord</Button>
      <Text>{error}</Text>
      <Text>{results}</Text>
      </View>
      <View className=' flex-row justify-between'>
      <Button   buttonStyle={{
                backgroundColor: '#D9D9D9',
                width: 210,
                height: 60,

              }}
              title={"ราคารวม"}
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
