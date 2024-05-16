import { View, Text ,TouchableOpacity,Image,StatusBar} from 'react-native'
import {useState,useEffect} from 'react';
import { Button, Icon } from '@rneui/base';
import { useUserAuth } from '../context/UserAuthenContext';
import { doc,getDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import ButtonPageProfile from '../components/ButtonPageProfile';
import { Skeleton } from '@rneui/base';
import { useAccelerometer } from '../context/UseAccelerometerContext';

export default function Profile({ navigation }) {
  const {user,logOut} = useUserAuth();

  const [name, setName] = useState("");
const [image, setImage] = useState("");
const [loading , setLoading] = useState(true)
const {isPortrait} = useAccelerometer();
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
    <View className="flex-1  bg-white" >
      

     
      
            {loading ? (
            <Skeleton  width={300} height={20} style={{borderRadius:20,margin:6}}></Skeleton>)
            :(
              <View className="flex-4 p-5 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:isPortrait ? 120 : 100,paddingTop:StatusBar.currentHeight}} >
                    <Image source={{uri: image}} style={{width:50,height:50, borderRadius:20}}></Image>
               <Text style={{marginLeft:10, fontWeight:'bold',fontSize:16}}>{name}</Text>
               </View>
             
            )}
           
        
      <View className='flex   w-full items-center justify-center my-10' style={{flexDirection:`${isPortrait ? 'column' : 'row'}`}}>
        <View className='flex flex-row '>
       <ButtonPageProfile name={"แก้ไขโปรไฟล์"} icon={"create"} page={"EditProfile"}/>
       <ButtonPageProfile name={"ประวัติการสั่งซื้อ"} icon={"list"} page={"OrderDetails"}/>
        </View>
        <View className='flex flex-row'>
        <ButtonPageProfile name={"รีวิวของฉัน"} icon={"document-text"} page={"myReview"}/>     
        <TouchableOpacity className='m-8 text-center items-center pl-4'  onPress={handleLogout}>
          <View className='rounded-full w-20 h-20 bg-[#CE4257] justify-center' >
          <Icon name="log-out" color="white" type='ionicon' size={50} ></Icon>
          </View>
          <Text className='text-[#CE4257] text-sm font-bold p-2'>ออกจากระบบ</Text>
        </TouchableOpacity>
        </View>
        <ButtonPageProfile name={"testpage"} icon={"document-text"} page={"TestPage"}/>
        
      </View>
      
    </View>
  )
}