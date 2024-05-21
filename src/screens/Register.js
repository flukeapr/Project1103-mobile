import { View, Text ,Image,ScrollView,StyleSheet, StatusBar} from 'react-native'
import {useState} from 'react';
import { Button } from '@rneui/themed';
import Logo from '../../assets/Logo-mini.png';
import { Input } from '@rneui/themed';
import LayerBottom from '../../assets/layerBottom.png';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, doc, setDoc,updateDoc } from "firebase/firestore";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { db,storage } from '../config/Firebase';
import { useUserAuth } from '../context/UserAuthenContext';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
export default function Register({navigation}) {
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image , setImage] = useState('');
  const [error, setError] = useState("");
  const {sigUp} = useUserAuth();
  const [fontsLoaded, fontError] = useFonts({
    'Bebas': require('../../assets/fonts/BebasNeue-Regular.ttf'),
    'Roboto': require('../../assets/fonts/Roboto-Regular.ttf'),
  });
 
  const handleSubmit = async () => {
    setError('');
    if (!fullName || !email || !password || !image) {
      Toast.show({
        type: 'error',
        text1: 'กรุณากรอกข้อมูลให้ครบ',
        text2: 'กรุณากรอกข้อมูลให้ครบ',
      });
      return;
    }

    try {
      const cred = await sigUp(email, password);
      if (!cred.user) {
        setError(cred.error.message);
        return;
      }

      const uid = cred.user.uid;
      const docRef = doc(db, 'Users', uid);
      await setDoc(docRef, {
        fullName: fullName,
        uid: uid,
      });

      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `Users/${uid}.jpg`);
      await uploadBytes(storageRef, blob);

      const ImageUrl = await getDownloadURL(storageRef);
      await updateProfile(cred.user, {
        displayName: fullName,
        photoURL: ImageUrl,
      });

      await updateDoc(docRef, { image: ImageUrl });

      Toast.show({
        type: 'success',
        text1: 'สมัครสมาชิกสําเร็จ',
        text2: 'กรุณาเข้าสู่ระบบ',
      });
      navigation.navigate('login');
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'เกิดข้อผิดพลาด',
        text2: 'กรุณาลองใหม่อีกครั้ง',
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
 
  return (
    <>
    
   
    <View className="flex-1 items-center justify-between bg-white pt-2" style={{paddingTop:StatusBar.currentHeight+10}}>
     
     <View className='items-center'>

     
     <View className=' flex flex-row w-full ' >
      <View className='flex flex-col  w-full items-center justify-center'>
        <View className='flex flex-row items-center m-4'>
        <Image source={Logo} ></Image>
        <Text style={styles.storeName}>Register Account</Text>
        </View>
       
      <Input containerStyle={{width: "65%"}} placeholder="FullName"    leftIcon={{ type: 'ionicon', name: 'person-circle', color: '#CE4257'  }} value={fullName} onChange={(e) => setFullName(e.nativeEvent.text)} />
      {/* <Input containerStyle={{width: "65%"}} placeholder="Address"    leftIcon={{ type: 'ionicon', name: 'home', color: '#CE4257'  }} value={address} onChange={(e) => setAddress(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "65%"}} placeholder="Phone"    leftIcon={{ type: 'ionicon', name: 'call', color: '#CE4257'  }} value={phone} onChange={(e) => setPhone(e.nativeEvent.text)}/>
     */}
<Input containerStyle={{width: "65%"}} placeholder="Email"    leftIcon={{ type: 'ionicon', name: 'mail', color: '#CE4257'  }} value={email} onChange={(e) => setEmail(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "65%"}} placeholder="Password" secureTextEntry={true}   leftIcon={{ type: 'ionicon', name: 'key', color: '#CE4257'  }} value={password} onChange={(e) => setPassword(e.nativeEvent.text)}/>
      <Input containerStyle={{width: "65%"}} placeholder="Profile"    leftIcon={{ type: 'ionicon', name: 'image', color: '#CE4257'  }} onPressIn={pickImage} value={image} onChange={(e) => setImage(e.nativeEvent.text)}/>
      {image && <Image source={{ uri: image }} style={styles.image} />}

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
              }}
              titleStyle={{fontFamily:'Bebas',fontSize: 30 }}
              size='lg'
             onPress={handleSubmit
            }
            />

      </View>

     
      
       
     </View>
     <Text className="text-sm font-medium  my-2"style={{fontFamily:'Roboto'}} >Already have account ? <Text className="text-[#CE4257]" onPress={() => navigation.navigate('login')}>LogIn</Text> </Text>
     </View>
      
      
     
      
     
      <View>
      <Image source={LayerBottom}  style={{marginTop:125}}></Image>
      </View>
    </View>
   
 </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  storeName:{
    fontSize:24,
    fontFamily:'Bebas',
    color:'#CE4257',
    margin:10
  },
});