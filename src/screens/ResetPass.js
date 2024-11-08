import { View, Text,Image, TouchableOpacity, StatusBar } from 'react-native'
import {useState} from 'react';
import Logo from '../../assets/Logo.png';
import { Button,Icon,Input } from '@rneui/themed';
import LayerBottom from '../../assets/layerBottom.png';
import { useFonts } from 'expo-font';
import { useUserAuth } from '../context/UserAuthenContext';
import Toast from 'react-native-toast-message';
import Animated,{FadeIn,FadeInDown,FadeInUp} from 'react-native-reanimated';
export default function ResetPass({navigation}) {
    const [email, setEmail] = useState('');
    const [fontsLoaded, fontError] = useFonts({
      'Bebas': require('../../assets/fonts/BebasNeue-Regular.ttf'),
      'Roboto': require('../../assets/fonts/Roboto-Regular.ttf'),
    });
    const {resetPass} = useUserAuth();
    const handleResetPass = async () => {
      if(!email){
        Toast.show({
          type: 'error',
          text1: 'เกิดข้อผิดพลาด',
          text2: 'กรุณากรอกอีเมลล์'
        })
        return;
      }
      try {
        await resetPass(email).then(()=>{
          Toast.show({
            type: 'success',
            text1: 'ส่งอีเมลล์สำเร็จ',
            text2: 'กรุณาตรวจสอบอีเมลล์เพื่อรีเซ็ตรหัสผ่าน'
          })
        })
        setEmail('');
        
      } catch (error) {
        console.error(error)
        Toast.show({
          type: 'error',
          text1: 'เกิดข้อผิดพลาด',
          text2: error
        })
      }
     

    }

  return (
    <>
    <View className="flex-1 items-center justify-between bg-white" style={{paddingTop:StatusBar.currentHeight}}>
      <View className='w-full items-center justify-center bg-white'>
      <Animated.Image entering={FadeInUp.delay(100).duration(1000).springify()} source={Logo} alt='Logo.png'></Animated.Image>

   
       <Animated.Text entering={FadeIn.duration(1000)} className='m-8 text-[#CE4257] 'style={{fontFamily:'Bebas',fontSize:24}}>Reset Password</Animated.Text>
       <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='flex items-center w-full'>
       <Input containerStyle={{width: "70%"}} placeholder="Email"    leftIcon={{ type: 'ionicon', name: 'mail', color: '#CE4257'  }} value={email} onChange={(e) => setEmail(e.nativeEvent.text)}/>

       </Animated.View>
        
       <Animated.View entering={FadeInDown.delay(400).duration(1000)}>
        <Button
              title="Send Email"
              buttonStyle={{
                backgroundColor: '#ff9d8a',
                
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 10,
              }}
              containerStyle={{
                width: 200,
                marginVertical: 10,
                
              }}
              titleStyle={{ fontFamily:'Bebas',fontSize: 24 }}
              size='lg'
             onPress={handleResetPass}
            />
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(600).duration(1000)}>

           
           <TouchableOpacity className='flex flex-row items-center' onPress={() => navigation.goBack()}>
           <Icon name='chevron-back' type='ionicon'></Icon>
           <Text className="text-sm font-medium  my-2"style={{fontFamily:'Roboto'}} >Back to <Text className="text-[#CE4257]" >LogIn</Text> </Text>

           </TouchableOpacity>
           </Animated.View>
      </View>
      <View>
      <Image source={LayerBottom} style={{}}></Image>
      </View>
       

            

          
    </View>
   
    
    </>
    
  )
}