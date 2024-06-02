import { View, Text ,TouchableOpacity,Image,StatusBar,ActivityIndicator} from 'react-native'
import {useState,useEffect} from 'react';
import { Button, Icon } from '@rneui/base';
import { useUserAuth } from '../context/UserAuthenContext';
import { doc,getDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import ButtonPageProfile from '../components/ButtonPageProfile';
import { Skeleton } from '@rneui/base';
import { useAccelerometer } from '../context/UseAccelerometerContext';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

export default function Profile({ navigation }) {
  const {user,logOut} = useUserAuth();

  const [name, setName] = useState("");
const [image, setImage] = useState("");
const [loading , setLoading] = useState(true)
const {isPortrait} = useAccelerometer();

const getImage = async ()=>{
  const docRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()){
    const data = docSnap.data();
    setImage(data.image);
  }else{
    console.log('not found Doc:=?')
  }
}
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    getImage().then(() => {
      setLoading(false);
    });
  });
  return unsubscribe;
 
}, [navigation,user]);

  const handleLogout = async () => {
     await logOut();
    navigation.navigate("login");
  };
  
  
  return (
    
    <View className="flex-1  bg-white" >  
{loading ? (
      <View className="flex-1  bg-white items-center justify-center h-full" >
        <ActivityIndicator size="large" color="#CE4257" />
      </View>
    ):(
      <>
      <View className="flex-4 p-5 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:isPortrait ? 120 : 100,paddingTop:StatusBar.currentHeight}} >
              {user ? (
          <>
            <Image source={{ uri: image ? image : "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} style={{ width: 50, height: 50, borderRadius: 20 }} />
            <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16,color:'white' }}>{user.displayName}</Text>
          </>
        ) : (
          <Skeleton style={{ width: 50, height: 50, borderRadius: 20 }} />
        )}
               </View>

      <View className='flex   w-full items-center justify-center my-10' style={{flexDirection:`${isPortrait ? 'column' : 'row'}`}}>
        <Animated.View entering={FadeInLeft.delay(100).duration(1000).springify()} className='flex flex-row '>
       <ButtonPageProfile name={"แก้ไขโปรไฟล์"} icon={"create"} page={"EditProfile"}/>
       <ButtonPageProfile name={"ประวัติการสั่งซื้อ"} icon={"list"} page={"MyOrders"}/>
        </Animated.View >
        <Animated.View entering={FadeInRight.delay(100).duration(1000).springify()} className='flex flex-row'>
        <ButtonPageProfile name={"รีวิวของฉัน"} icon={"document-text"} page={"myReview"}/>     
        <TouchableOpacity className='m-8 text-center items-center pl-4'  onPress={handleLogout}>
          <View className='rounded-full w-20 h-20 bg-[#CE4257] justify-center' >
          <Icon name="log-out" color="white" type='ionicon' size={50} ></Icon>
          </View>
          <Text className='text-[#CE4257] text-sm font-bold p-2'>ออกจากระบบ</Text>
        </TouchableOpacity>
        </Animated.View>
      
        
      </View>
      
      </>
      
    )}
              
      
    </View>
  )
}