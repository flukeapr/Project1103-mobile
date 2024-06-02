import { View, Text,TouchableOpacity,Image,FlatList, ActivityIndicator,StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { doc,getDoc,getDocs,where,collection,query } from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthenContext';
import { db } from '../config/Firebase';
import { Button } from '@rneui/base';
import { Skeleton} from '@rneui/base';


export default function OrderDetails({navigation,route}) {
  const {id}= route.params
    const {user} = useUserAuth();
    const [order ,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    
    const getOrderDetail = async () => {
      try {
        const orderDoc = doc(db, "Orders", id);
        const orderSnapshot = await getDoc(orderDoc);
        const orderData = orderSnapshot.data();
       
       
       console.log(orderData);
        setOrders(orderData);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
  }
          
         useEffect(()=>{

          getOrderDetail().then(()=>setLoading(false))

         },[])
            
          
 
    
    
  return (
    <View className='flex-1 justify-center bg-white'>
         <View className="flex-4 px-2 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:100,paddingTop:StatusBar.currentHeight}}>
            <TouchableOpacity 
            className='flex flex-row p-2 items-center'
            onPress={() => navigation.navigate("MyOrders")}>
            <Image source={require('../../assets/prev.png')}></Image>
            <Text className='text-[#fff] text-lg ml-8'>ประวัติการสั่งซื้อ</Text>
            </TouchableOpacity>
       
        
        </View>
        
        {loading ? (
          <View className='flex-1 bg-white items-center pt-10' >
          <Skeleton 
           width={300}
           height={450}
           style={{borderWidth:1,borderRadius:10}}>
            
           </Skeleton>
           <Skeleton  width={300} height={20} style={{borderRadius:20,margin:6}}></Skeleton>
           <Skeleton  width={300} height={20} style={{borderRadius:20,margin:6}}></Skeleton>
           <Skeleton  width={300} height={20} style={{borderRadius:20,margin:6}}></Skeleton>
          </View>
        ):(
          
          <View className='flex-1 bg-white items-center pt-10 mb-4'>
              
            
           
          <Image source={{uri:order.image}}  style={{ width: 300, height: 450, marginRight: 10 ,borderColor:'#CE4257',borderWidth:1,borderRadius:10,justifyContent:'center'} }></Image>
         <Text className='w-[300] text-lg text-[#CE4257] font-semibold my-2 text-ellipsis' style={{fontSize:18}}>{order.book_name}</Text>
         <View>
         <Text style={{fontSize:16,padding:2}}>ผู้รับ: {order.receiver}</Text>
         <Text style={{fontSize:16,padding:2}}>เบอร์โทร: {order.phone}</Text>
         <Text style={{fontSize:16,padding:2}}>จำนวน: {order.quantity} ชิ้น</Text>
         <Text style={{fontSize:16,padding:2}}>ราคา: {order.total}.00 บาท</Text>

         <View className='flex flex-row' style={{fontSize:16}}>
          <Button title={'ยกเลิกการสั่งซื้อ'}/>
          <Text>สถานะ:</Text>
          <View className='pl-2'>
            <Text>
            {order.status}
            </Text>
          
          </View>
          </View>
         </View>
       
         
          
         
            
          
          
            
        
         </View>
        ) }
       
           
          
      
        
      
    </View>
  )
}