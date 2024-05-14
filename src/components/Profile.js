import { View, Text ,TouchableOpacity,Image} from 'react-native'
import {useState,useEffect} from 'react';
import { Button, Icon } from '@rneui/base';
import { useUserAuth } from '../context/UserAuthenContext';
import { doc,getDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export default function Profile({ navigation }) {
  const {user,logOut} = useUserAuth();

  const [name, setName] = useState("");
const [image, setImage] = useState("");
const [loading , setLoading] = useState(true)
  const getUser = async()=>{
    const userRef = doc(db,"Users", user.uid);
    const docSnap = await getDoc(userRef);
    setName(docSnap.data().fullName);
    setImage(docSnap.data().image|| "")
  }
  useEffect(()=>{
    getUser().then(setLoading(false))
  })


  const handleLogout = async () => {
     await logOut();
    navigation.navigate("login");
  };
  return (
    <View className="flex-1  bg-white">
      <View className="flex-4 p-10 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:100}}>
            
            <Image source={{uri: image}} style={{width:50,height:50, borderRadius:20}}></Image>
            <Text style={{marginLeft:10, fontWeight:'bold',fontSize:16}}>{name}</Text>
        </View>
      <View className='flex flex-cols  w-full items-center justify-center my-10'>
        <View className='flex flex-row '>
        <TouchableOpacity className='m-8 text-center items-center ' onPress={() => navigation.navigate('editprofile')}>
          <View className='rounded-full w-20 h-20 bg-[#CE4257] justify-center ' >
            <Icon name="create" color="white" type='ionicon' size={50} ></Icon>
          </View>
          <Text className='text-[#CE4257] text-sm font-bold p-2'>แก้ไขโปรไฟล์</Text>
        </TouchableOpacity>

        <TouchableOpacity className='m-8 text-center items-center' onPress={()=> navigation.navigate('orderdetails')}>
        <View className='rounded-full w-20 h-20 bg-[#CE4257] justify-center' >
          <Icon name="list" color="white" type='ionicon' size={50} ></Icon>
          </View>
          <Text className='text-[#CE4257] text-sm font-bold p-2'>ประวัติการสั่งซื้อ</Text>
        </TouchableOpacity>
        </View>
        <View className='flex flex-row'>
        <TouchableOpacity className='m-8 text-center items-center' onPress={()=> navigation.navigate('myReview')}>
        <View className='rounded-full w-20 h-20 bg-[#CE4257] justify-center' >
          <Icon name="document-text" color="white" type='ionicon' size={50} ></Icon>
          </View>
          <Text className='text-[#CE4257] text-sm font-bold p-2'>รีวิวของฉัน</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className='m-8 text-center items-center pl-4'  onPress={handleLogout}>
          <View className='rounded-full w-20 h-20 bg-[#CE4257] justify-center' >
          <Icon name="log-out" color="white" type='ionicon' size={50} ></Icon>
          </View>
          <Text className='text-[#CE4257] text-sm font-bold p-2'>ออกจากระบบ</Text>
        </TouchableOpacity>
        </View>
       
        
      </View>
      
    </View>
  )
}