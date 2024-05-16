import { View, Text ,Image,ScrollView} from 'react-native'
import {useState} from 'react';
import { Button } from '@rneui/themed';
import Logo from '../../assets/Logo.png';
import { Input } from '@rneui/themed';
import LayerBottom from '../../assets/layerBottom.png';
import * as ImagePicker from 'expo-image-picker';


export default function Register({navigation}) {
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image , setImage] = useState(null)
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
    
   
    <View className="flex-1 items-center justify-center bg-white pt-2">
      <Image source={Logo} ></Image>
     <View className='flex flex-row w-full mt-6'>
      <View className='flex flex-col  w-full items-center'>
      <Input containerStyle={{width: "65%"}} placeholder="FullName"    leftIcon={{ type: 'ionicon', name: 'person-circle', color: '#CE4257'  }} value={fullName} onChange={(e) => setFullName(e.nativeEvent.text)} />
      <Input containerStyle={{width: "65%"}} placeholder="Address"    leftIcon={{ type: 'ionicon', name: 'home', color: '#CE4257'  }} value={address} onChange={(e) => setAddress(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "65%"}} placeholder="Phone"    leftIcon={{ type: 'ionicon', name: 'call', color: '#CE4257'  }} value={phone} onChange={(e) => setPhone(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "65%"}} placeholder="Email"    leftIcon={{ type: 'ionicon', name: 'mail', color: '#CE4257'  }} value={email} onChange={(e) => setEmail(e.nativeEvent.text)}/>

<Input containerStyle={{width: "65%"}} placeholder="Password" secureTextEntry={true}   leftIcon={{ type: 'ionicon', name: 'key', color: '#CE4257'  }} value={password} onChange={(e) => setPassword(e.nativeEvent.text)}/>

      </View>
      {/* <View className='flex flex-col  w-[50] '>
      <Button title="Image Profile" onPress={pickImage} size='lg' titleStyle={{ fontWeight: 'bold',fontSize: 11 }} containerStyle={{width: 70,marginVertical: 10 }} buttonStyle={{backgroundColor:'#CE4257',borderRadius:10}}/>
      {image && <Image source={{ uri: image }}  />}

      </View>
        */}
     </View>
        
      
      
     
      
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
     <Image source={LayerBottom}  ></Image>
 </View>
 </>
  )
}