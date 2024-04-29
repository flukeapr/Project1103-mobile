import { View, Image,Text } from 'react-native'
import {useState,useEffect} from 'react';
import { Button } from '@rneui/themed';
import Logo from '../../assets/Logo.png';
import LayerBottom from '../../assets/layerBottom.png';
import { Input } from '@rneui/themed';
import Toast from 'react-native-toast-message'
import { db,auth } from '../config/Firebase';
import { useUserAuth } from '../context/UserAuthenContext';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {  Login ,user} = useUserAuth();
const handleLogin = async ()=>{
  if(email && password){
    try {
        // await Login(email,password);
        Toast.show({
          type: 'success',
          text1: 'Login Success',
          text2: 'Welcome to the App'
        })
        setEmail('');
        setPassword('');
        navigation.navigate('home');
        
        
    } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Please try again'
        })
    }

  }else{
    navigation.navigate('main');
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: 'Please Enter Your Email and Password'
    })
  }

}
  return (
    <>
     <View className="flex-1 items-center justify-center bg-white">
      
    <Image source={Logo} alt='Logo.png'></Image>

    <Input containerStyle={{width: "70%"}} placeholder="Email"    leftIcon={{ type: 'ionicon', name: 'mail', color: '#CE4257'  }} value={email} onChange={(e) => setEmail(e.nativeEvent.text)}/>
    <Input containerStyle={{width: "70%"}} placeholder="Password" secureTextEntry={true}   leftIcon={{ type: 'ionicon', name: 'key', color: '#CE4257'  }} value={password} onChange={(e) => setPassword(e.nativeEvent.text)}/>
    

    <Text className="text-sm font-semibold ml-36 my-2" style={{color:"#CE4257"}} onPress={() => navigation.navigate('resetpass')}>Reset Password</Text>
    
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
              titleStyle={{ fontWeight: 'bold',fontSize: 20 }}
              size='lg'
              onPress={handleLogin}
            />
            <Text className="text-sm font-medium  my-2" >Not Register? <Text className="text-[#CE4257]" onPress={() => navigation.navigate('register')}>Create Account</Text> </Text>
    </View>
    
    <View className="flex-3 bg-white pt-2">
        <Image source={LayerBottom}></Image>
    </View>
    </>
   


   
    
  )
}