import { View, Text, PermissionsAndroid,Image,ActivityIndicator,FlatList, ScrollView ,RefreshControl} from 'react-native';
import React, { useState,useEffect,useCallback } from 'react';
import { Button,Icon } from '@rneui/base';
import Voice from 'react-native-voice';
import Tobtabs from './Tobtabs';
import { useUserAuth } from '../context/UserAuthenContext';
import { getDocs, collection, increment,doc,updateDoc,deleteDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export default function Cart() {
  const [products ,setProducts] = useState([]);
  const {user} = useUserAuth();
  const [loading , setLoading] = useState(true);

  const [total , setTotal] = useState(0);

  

  
  
  const getCart = async () => {
    try {
      const cartQuery = collection(db, "Users", user.uid, "Cart");
      const cartSnapshot = await getDocs(cartQuery);
      const cartData = cartSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(cartData);
      
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }

  useEffect(() => {
    getCart().then(() => {
      getTotal();
      setLoading(false);
      
    });
   
  },[]);


  const getTotal = () => {
    let total = 0;
    
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotal(total);
  }

  const increaseQuantity = async (item) => {
   
    try {
      const productDoc = doc(db, "Users", user.uid, "Cart", item.id);
     
      await updateDoc(productDoc, { quantity: increment(1), price: increment(item.price), total: increment(item.price) });
      getCart();
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };
  
  const decreaseQuantity = async (item) => {
    try {
      const productDoc = doc(db, "Users", user.uid, "Cart", item.id);
     if (item.quantity === 1) {
        await deleteDoc(productDoc).then(() => {
          getCart();
        })
      } else {
      await updateDoc(productDoc, { quantity: increment(-1),price : increment(-(item.price/2)), total: increment(-(item.price/2)) });
      getCart();
      }
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }
  
  const renderItem = ({ item }) => {
    return (
     
        <View style={{ flexDirection: "row", padding: 10 }} key={item.id} >
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 150, marginRight: 10 ,borderColor:'#CE4257',borderWidth:1,borderRadius:10} }
        />
        <View>
          <Text className="text-[#CE4257] w-[250]" numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
          <Text className="text-xs py-1">ราคา {item.price}.00 บาท</Text>
          <View className='flex items-end justify-end flex-row'>
            <View className='flex flex-row items-center'>

            <Icon name='remove-circle-outline' type='ionicon' onPress={() => decreaseQuantity(item)}></Icon>
             <Text> {item.quantity} </Text>
            <Icon name='add-circle-outline' type='ionicon'  onPress={() => increaseQuantity(item)}></Icon>
            </View>
          </View>
        </View>
      </View>
      
     
        
      
    );
  };


  return (
    <>
    <Tobtabs></Tobtabs>
    <View className="flex-1 justify-between items-center bg-white">
      <View>
        {loading ? (
            <ActivityIndicator size="large" color="#CE4257" />
         ) : (
           
             <FlatList
             style={{marginLeft:10}}
               data={products}
               renderItem={renderItem}
               keyExtractor={(item) => item.id}
             />
           
        
         )
        }
      
    <View className=' flex-row justify-between'>
      <Button   buttonStyle={{
                backgroundColor: '#D9D9D9',
                width: 210,
                height: 60,

              }}
              title={`ราคารวม ${total}.00 บาท`}
              titleStyle={{ color: '#CE4257',fontWeight:'bold' }}></Button>
    
      <Button  buttonStyle={{
                backgroundColor: '#720026',
                width: 210,
                height: 60,
              }}
              titleStyle={{ color: 'white',fontWeight:'bold' }}
              title={"ชำระเงิน"} 
              iconRight={true} 
              icon={<Image source={require('../../assets/payment.png')}
               style={{width:30,height:30,marginLeft:8,borderRadius:5}}
               />}></Button>
      </View>
      
      </View>
      
     
    </View>
    
    </>
    
  )
}
