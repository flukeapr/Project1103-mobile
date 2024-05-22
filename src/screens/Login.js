import { View, Image,Text,StyleSheet,StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import {useState,useEffect} from 'react';
import { Button } from '@rneui/themed';
import Logo from '../../assets/Logo.png';
import LayerBottom from '../../assets/layerBottom.png';
import { Input } from '@rneui/themed';
import Toast from 'react-native-toast-message'
import { db,auth } from '../config/Firebase';
import { useUserAuth } from '../context/UserAuthenContext';
import { Dimensions } from 'react-native';
import { useAccelerometer } from '../context/UseAccelerometerContext';
import { useFonts } from 'expo-font';
import LogoLandscape from '../../assets/Logo-landscape.png'
export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {  Login ,user} = useUserAuth();
  const { isPortrait } = useAccelerometer()
  const [fontsLoaded, fontError] = useFonts({
    'Bebas': require('../../assets/fonts/BebasNeue-Regular.ttf'),
    'Roboto': require('../../assets/fonts/Roboto-Regular.ttf'),
  });
    
const handleLogin = async ()=>{
 
  if(email && password){
    try {
     
        await Login(email,password)
       
      
        Toast.show({
          type: 'success',
          text1: 'Login Success',
          text2: 'Welcome to the App'
        })
       
        // setEmail('');
        // setPassword('');
       
        navigation.navigate('main');
        
        
    } catch (error) {
        
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Please try again'
        })
    }

  }else{

   
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: 'Please Enter Your Email and Password'
    })
  }

}
  return (
    <>
    {isPortrait ? (
      <>
      

     
      <View className="flex-1 items-center justify-between bg-white" style={{paddingTop:StatusBar.currentHeight+10}}>
      
      <View className=' w-full items-center justify-center'>
      <Image source={Logo} alt='Logo.png'></Image>

  
  <Text style={styles.storeName}>ReadMe Store</Text>
  <Input containerStyle={{width: "70%"}} placeholder="Email"  inputStyle={{fontFamily:'Roboto'}}   leftIcon={{ type: 'ionicon', name: 'mail', color: '#CE4257'  }} value={email} onChange={(e) => setEmail(e.nativeEvent.text)}/>
  <Input containerStyle={{width: "70%"}} placeholder="Password" inputStyle={{fontFamily:'Roboto'}} secureTextEntry={true}   leftIcon={{ type: 'ionicon', name: 'key', color: '#CE4257'  }} value={password} onChange={(e) => setPassword(e.nativeEvent.text)}/>
  
  
  <Text className="text-sm font-semibold ml-36 my-2" style={{color:"#CE4257",fontFamily:'Roboto'}} onPress={() => navigation.navigate('resetpass')}>Reset Password</Text>
  
  
  <Button
            title="LOGIN"
            buttonStyle={{
              backgroundColor: '#ff9d8a',
              
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 10,
            }}
            containerStyle={{
              width: 250,
              marginHorizontal: 50,
              marginVertical: 10,
              
            }}
            titleStyle={{fontSize: 30,fontFamily:'Bebas'}}
            size='lg'
            onPress={handleLogin}
          />
         
           
          <Text className="text-sm font-medium  "style={{fontFamily:'Roboto'}} >Not Register? <Text className="text-[#CE4257]" onPress={() => navigation.navigate('register')}>Create Account</Text> </Text>
        
      </View>
       <View >
       <Image source={LayerBottom} ></Image>
      </View> 
      </View>
    
     
      </>
    ): (
      <>
       <View className="flex flex-row items-center" style={styles.landscape}>
        <View style={styles.container}>
        <Image source={LogoLandscape} alt='Logo.png'></Image>
        </View>
        <View className='p-10 items-center'>
          <Text className=' font-semibold text-[#CE4257]' style={{fontFamily:"Bebas",fontSize:26}}>Welcome Back</Text>
        <Input containerStyle={{width: "100%"}} placeholder="Email"    leftIcon={{ type: 'ionicon', name: 'mail', color: '#CE4257'  }} value={email} onChange={(e) => setEmail(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "100%"}} placeholder="Password" secureTextEntry={true}   leftIcon={{ type: 'ionicon', name: 'key', color: '#CE4257'  }} value={password} onChange={(e) => setPassword(e.nativeEvent.text)}/>

      <Button
                title="LOGIN"
                buttonStyle={{
                  backgroundColor: '#ff9d8a',
                  
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 10,
                }}
                containerStyle={{
                  width: 250,
                  marginHorizontal: 50,
                  marginVertical: 10,
                  
                }}
                titleStyle={{ fontFamily:'Bebas',fontSize: 25 }}
                size='lg'
                onPress={handleLogin}
              />
              <Text className="text-sm font-medium  my-2" >Not Register? <Text className="text-[#CE4257]" onPress={() => navigation.navigate('register')}>Create Account</Text> </Text>
              <Text className="text-sm font-semibold  my-2" style={{color:"#CE4257"}} onPress={() => navigation.navigate('resetpass')}>Reset Password</Text>

      </View>
      </View>
      
      
      
      
      
      
      
      </>
     
    )}
     
    </>
   


   
    
  )
}
//720026
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#720026',
    justifyContent: 'center',
    alignItems:'center',
   
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
    backgroundColor: 'white',
   
  },
  modeText: {
    color: '#fff',
    fontSize: 24,
  },
  storeName:{
    fontSize:24,
    fontFamily:'Bebas',
    color:'#CE4257',
    margin:20

  }
});