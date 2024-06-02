import { View, Text,TouchableOpacity,Image,StatusBar } from 'react-native'
import {useState,useEffect} from 'react'
import { updateProfile } from 'firebase/auth'
import { useUserAuth } from '../context/UserAuthenContext'
import { Input,Button } from '@rneui/themed'
import { getDoc,doc, updateDoc } from 'firebase/firestore'
import { db,storage,auth } from '../config/Firebase'
import Toast from 'react-native-toast-message'
import * as ImagePicker from 'expo-image-picker';
import { ref,uploadBytes,getDownloadURL,deleteObject } from 'firebase/storage';



export default function EditProfile({navigation}) {
  const {user,setUser} = useUserAuth();
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [image ,setImage] = useState('');
  const getUserDetail = async ()=>{
    const docRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(docRef);
   
    if(docSnap.exists()){
      const data = docSnap.data();
      setFullName(data.fullName);
      setAddress(data.address|| '');
      setPhone(data.phone||'');
      setImage(data.image);
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
        phone:phone,
        
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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
   
    if (!result.canceled) {
      try {
        const response = await fetch(result.assets[0].uri);
        if (!response.ok) {
          throw new Error('Network request failed');
        }
        const file = await response.blob();
        const storeRef = ref(storage,`Users/${user.uid}.jpg`);
      const imageStore =  await getDownloadURL(storeRef)
       
      if(imageStore){
        await deleteObject(storeRef)
        await uploadBytes(storeRef,file).then(async(url)=>{
          const imageDownload =  await getDownloadURL(storeRef)
         
          const docRef = doc(db, "Users", user.uid);
          await updateDoc(docRef,{
            image:imageDownload
          })
          await auth.currentUser.reload();
          getUserDetail()
          Toast.show({
            type: 'success',
            text1: 'ดำเนินการสำเร็จ',
            text2: 'แก้ไขโปรไฟล์สำเร็จ'
          })
          
        })

      }
      } catch (error) {
        console.error(error);
      }
     
      
      

    }
  };

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
       <Image source={{uri: image ? image : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}} style={{width:100,height:100, borderRadius:100,borderColor:'black',borderWidth:2,margin:4}}/>
       <Text className='m-2 text-md' onPress={pickImage}>แก้ไขรูปโปรไฟล์</Text>
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