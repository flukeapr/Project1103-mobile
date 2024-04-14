import { View, Text ,Image} from 'react-native'
import {useState} from 'react';
import { Button } from '@rneui/themed';
import Logo from '../../assets/Logo.png';
import { Input } from '@rneui/themed';
import LayerBottom from '../../assets/layerBottom.png';

export default function Register({navigation}) {
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <>
    
   
    <View className="flex-1 items-center justify-center bg-white pt-2">
      <Image source={Logo}></Image>
      <Input containerStyle={{width: "70%"}} placeholder="FullName"    leftIcon={{ type: 'ionicon', name: 'person-circle', color: '#CE4257'  }} value={fullName} onChange={(e) => setFullName(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "70%"}} placeholder="Address"    leftIcon={{ type: 'ionicon', name: 'home', color: '#CE4257'  }} value={address} onChange={(e) => setAddress(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "70%"}} placeholder="Phone"    leftIcon={{ type: 'ionicon', name: 'call', color: '#CE4257'  }} value={phone} onChange={(e) => setPhone(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "70%"}} placeholder="Email"    leftIcon={{ type: 'ionicon', name: 'mail', color: '#CE4257'  }} value={email} onChange={(e) => setEmail(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "70%"}} placeholder="Password" secureTextEntry={true}   leftIcon={{ type: 'ionicon', name: 'key', color: '#CE4257'  }} value={email} onChange={(e) => setEmail(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "70%"}} placeholder="ImageProfile" secureTextEntry={true}   leftIcon={{ type: 'ionicon', name: 'key', color: '#CE4257'  }} value={email} onChange={(e) => setEmail(e.nativeEvent.text)} />
      <Button
              title="SIGNUP"
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
             onPress={()=>navigation.navigate('login')}
            />
    </View>
     <View className="flex-3 bg-white ">
     <Image source={LayerBottom}></Image>
 </View>
 </>
  )
}