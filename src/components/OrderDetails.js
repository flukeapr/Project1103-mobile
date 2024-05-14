import { View, Text,TouchableOpacity,Image,FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import { doc,getDoc,getDocs,where,collection,query } from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthenContext';
import { db } from '../config/Firebase';
import { Button } from '@rneui/base';

export default function OrderDetails({navigation}) {
    const {user} = useUserAuth();
    const [orders ,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const getOrder = async ()=>{
        try {
            const q = query(collection(db, "Orders"), where("user_id", "==", `${user.uid}` ));
        const querySnapshot = await getDocs(q);
       const orderDetails =  querySnapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
       }))
       setOrders(orderDetails);
        } catch (error) {
            console.error(error);
        }
        
    }
    const renderItem = ({ item }) => {
        return (
         
            <View style={{ flexDirection: "row", padding: 10 }} key={item.id}  className=' bg-[#fff] rounded-lg shadow-lg shadow-gray-950 m-2 '>
               <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 150, marginRight: 10 ,borderColor:'#CE4257',borderWidth:1,borderRadius:10} }
        />
        <View>
          <Text className="text-[#CE4257] w-[250] font-semibold" numberOfLines={1} ellipsizeMode="tail">{item.book_name}</Text>
          
          <Text className="text-xs py-1 ]">สถานะ {item.status}</Text>
          <Text className="text-xs py-1">จำนวน {item.quantity} ชิ้น</Text>
          <Text className="text-xs py-1">ราคารวม {item.total}.00 บาท</Text>
          
          <Button disabled={item.review==="รอรีวิว" ? false : true} onPress={() => navigation.navigate("reviewBook", { product: item })}
          title={"รีวิวหนังสือ"} buttonStyle={{width:125,height:35,borderRadius:30,backgroundColor:'#CE4257'}} containerStyle={{margin:10}} titleStyle={{fontSize:14}}/>
        
        </View>
      </View>
           
          
         
            
          
        );
      };
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getOrder().then(() => {
            setLoading(false);
          });
        });
        return unsubscribe;
    
      },[navigation]);
    
    
  return (
    <View>
         <View className="flex-4 px-2 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:100}}>
            <TouchableOpacity 
            className='flex flex-row p-2 items-center'
            onPress={() => navigation.navigate("profile")}>
            <Image source={require('../../assets/prev.png')}></Image>
            <Text className='text-[#fff] text-lg ml-8'>ประวัติการสั่งซื้อ</Text>
            </TouchableOpacity>
       
        
        </View>
        
        <View>
        {loading ? (
            <View className='flex items-center justify-center h-[700]'>
                 <ActivityIndicator  size="large" color="#CE4257" />
            </View>
       
      ):(
        orders.length>0 ?(
            <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        ) : (
            <View  className='flex items-center justify-center h-[700]'>
                <Text className='text-[#CE4257]  font-bold'>ไม่มีประวัติการสั่งซื้อ</Text>
            </View>
        )
        
      )}
        </View>
      
    </View>
  )
}