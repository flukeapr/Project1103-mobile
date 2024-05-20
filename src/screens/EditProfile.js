import { View, Text,TouchableOpacity,Image,StatusBar } from 'react-native'
import {useState,useEffect} from 'react'
import { updateProfile } from 'firebase/auth'
import { useUserAuth } from '../context/UserAuthenContext'
import { Input,Button } from '@rneui/themed'
import { getDoc,doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/Firebase'
import Toast from 'react-native-toast-message'




export default function EditProfile({navigation}) {
  const {user} = useUserAuth();
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const getUserDetail = async ()=>{
    const docRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const data = docSnap.data();
      setFullName(data.fullName);
      setAddress(data.address);
      setPhone(data.phone);
    }else{
      console.log('not found Doc:=?')
    }
  }
  const updateProfile = async ()=>{
    const docRef = doc(db, "Users", user.uid);
    try {
      await updateDoc(docRef,{
        fullName:fullName,
        address:address,
        phone:phone
      }).then(()=>{
        Toast.show({
          type: 'success',
          text1: 'ดำเนินการสำเร็จ',
          text2: 'แก้ไขโปรไฟล์สำเร็จ'
        })
      })
      getUserDetail();
    } catch (error) {
      console.error(error);
    }
   
  }
  useEffect(()=>{
    getUserDetail();
  },[])
  return (
    <>
    
    <View className='flex-1 flex bg-[#fff]  ' >
    <View className="flex px-2 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:100,paddingTop:StatusBar.currentHeight}}>
    <TouchableOpacity 
    className='flex flex-row p-2 items-center'
    onPress={() => navigation.navigate("profile")}>
    <Image source={require('../../assets/prev.png')}></Image>
    <Text className='text-[#fff] text-lg ml-8'>แก้ไขโปรไฟล์</Text>
    </TouchableOpacity>


  </View >
       <View className='flex items-center mt-20'>
       <Image source={{uri: user.photoURL}} style={{width:100,height:100, borderRadius:100,borderColor:'black',borderWidth:2,margin:4}}/>
        <Input containerStyle={{width: "70%"}}    leftIcon={{ type: 'ionicon', name: 'person', color: '#CE4257'  }} value={fullName} onChange={(e) => setFullName(e.nativeEvent.text)}/>
        <Input containerStyle={{width: "70%"}}    leftIcon={{ type: 'ionicon', name: 'home', color: '#CE4257'  }} value={address} onChange={(e) => setAddress(e.nativeEvent.text)}/>
        <Input containerStyle={{width: "70%"}}     leftIcon={{ type: 'ionicon', name: 'call', color: '#CE4257'  }} value={phone} onChange={(e) => setPhone(e.nativeEvent.text)}/>
      <Button
       title={'บันทึก'} buttonStyle={{
        backgroundColor: '#ff9d8a',
        width:200,
        borderRadius: 10,
        
        }}
        titleStyle={{fontSize:18,fontWeight:'bold'}}
        className='shadow-lg shadow-gray-950'
        onPress={updateProfile}
        ></Button>
       </View>
          
        
    </View>
    </>
    
  )
}