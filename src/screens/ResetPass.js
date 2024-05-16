import { View, Text,Image } from 'react-native'
import {useState} from 'react';
import Logo from '../../assets/Logo.png';
import { Button,Input } from '@rneui/themed';
import LayerBottom from '../../assets/layerBottom.png';

export default function ResetPass({navigation}) {
    const [email, setEmail] = useState('');
  return (
    <>
    <View className="flex-1 items-center justify-center bg-white">
       <Image source={Logo} alt='Logo.png'></Image>
       <Text className='m-8 text-[#CE4257] font-bold'>Reset Password</Text>
       <Input containerStyle={{width: "70%"}} placeholder="Email"    leftIcon={{ type: 'ionicon', name: 'mail', color: '#CE4257'  }} value={email} onChange={(e) => setEmail(e.nativeEvent.text)}/>
        
        <Button
              title="Send Email"
              buttonStyle={{
                backgroundColor: '#CE4257',
                
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 10,
              }}
              containerStyle={{
                width: 200,
                marginVertical: 10,
                
              }}
              titleStyle={{ fontWeight: 'bold',fontSize: 20 }}
              size='lg'
             
            />
            <Button
              title="Back"
              buttonStyle={{
                backgroundColor: 'white',
                
                borderWidth: 2,
                borderColor: '#CE4257',
                borderRadius: 10,
              }}
              containerStyle={{
                width: 200,
                marginVertical: 10,
                
              }}
              titleStyle={{ fontWeight: 'bold',fontSize: 20 ,color:'#CE4257'}}
              size='lg'
             onPress={() => navigation.navigate('login')}
            />
       
       
    </View>
    <View className="flex-3 bg-white pt-2">
    <Image source={LayerBottom}></Image>
</View>
    
    </>
    
  )
}