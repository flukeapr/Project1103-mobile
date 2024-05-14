import { View, Text, PermissionsAndroid,Image,ActivityIndicator,FlatList, ScrollView ,RefreshControl, TouchableOpacity} from 'react-native';
import React, { useState,useEffect,useCallback, useRef } from 'react';
import { Button,Icon } from '@rneui/base';
import Voice from 'react-native-voice';
import Tobtabs from './Tobtabs';
import { useUserAuth } from '../context/UserAuthenContext';
import { getDocs, collection, increment,doc,updateDoc,deleteDoc ,getDoc,addDoc} from 'firebase/firestore';
import { db } from '../config/Firebase';
import Toast from 'react-native-toast-message';
import ActionSheet from 'react-native-actions-sheet';

export default function Cart({navigation}) {
  const [products ,setProducts] = useState([]);
  const {user} = useUserAuth();
  const [loading , setLoading] = useState(true);
const actionSheetRef = useRef(null);
  const [total , setTotal] = useState(0);
 
  

  
  
  const getCart = async () => {
    try {
      const cartQuery = collection(db, "Users", user.uid, "Cart");
      const cartSnapshot = await getDocs(cartQuery);
      const cartData = cartSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      let total = 0;
      
      cartData.forEach((doc) => {
        total += doc.total;
      });
      setTotal(total);
      setProducts(cartData);
      
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCart().then(() => {
        setLoading(false);
      });
    });
    return unsubscribe;

  },[navigation]);

  const removeFromCart = async (id) => {
    try {
            
      await deleteDoc(doc(db, "Users", user.uid, "Cart", id)).then(()=>{
        Toast.show({
          type: 'success',
          text1: 'ลบสินค้าออกจากตระกร้าสำเร็จ',
          text2: 'กรุณาตรวจสอบสินค้าในตะกร้า',
        })
        getCart();
      }
  
      )
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
    
  }
  
 



  const increaseQuantity = async (item) => {
   
    try {
      const productDoc = doc(db, "Users", user.uid, "Cart", item.id);
     
      await updateDoc(productDoc, { quantity: increment(1), total: increment(item.price) });
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
      await updateDoc(productDoc, { quantity: increment(-1), total: increment(-(item.price)) });
      getCart();
      }
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }
  
  const orderItem = async ()=>{
    try {
      const docRef  = doc(db, "Users", user.uid);
      const querySnapshot = await getDoc(docRef);
     
      let fullName = '';
      let address = '';
      let phone = '';
  
     if(querySnapshot.exists()){
      fullName = querySnapshot.data().fullName;
      address = querySnapshot.data().address;
      phone = querySnapshot.data().phone;
      
     }else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");

    }
    
     
      const orderPromises = products.map(async (product) => {
        await addDoc(collection(db, "Orders"), {
          user_id: user.uid,
          book_id: product.book_id,
          total: product.total,
          quantity: product.quantity,
          status: "รอชำระเงิน",
          book_name: product.name,
          image: product.image,
          receiver: fullName,
          address: address,
          phone:phone,
          date: new Date(),
          review: "รอรีวิว"
        });
      });
  
      await Promise.all(orderPromises);
  
      const deleteCartPromises = products.map(async (product) => {
        const cartRef = doc(db, "Users", user.uid, "Cart", product.id);
        
         await deleteDoc(cartRef);
      });
  
      await Promise.all(deleteCartPromises)
  
      Toast.show({
          type: 'success',
          text1: 'สั่งซื้อสำเร็จ',
          text2: 'กรุณาตรวจสอบสินค้าที่ประวัติการสั่งซื้อ',
        })
        actionSheetRef.current?.hide();
        getCart();
    } catch (error) {
      console.error('Error ordering item: ', error);
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
          <View>
            <Text className="text-[#CE4257] w-[250] font-semibold" numberOfLines={1} >{item.name}</Text>
            <Text className="text-xs py-1">ราคา {item.price}.00 บาท</Text>
          </View>
          
          <View className='flex justify-between flex-row'>
            <View className='flex flex-row items-center'>

            <Icon name='remove-circle' type='ionicon' color={'#CE4257'} onPress={() => decreaseQuantity(item)}></Icon>
             <Text> {item.quantity} </Text>
            <Icon name='add-circle' type='ionicon'  color={'#CE4257'} onPress={() => increaseQuantity(item)}></Icon>
            </View>
            <View className='flex items-end justify-end'>
              <TouchableOpacity className='border border-solid  rounded-full w-[30] h-[30] items-center justify-center' onPress={()=> removeFromCart(item.id) }>
              <Icon name='trash-outline' type='ionicon' size={20} > </Icon>
              </TouchableOpacity>
             
            </View>
          </View>
        </View>
      </View>
      
     
        
      
    );
  };

  const renderOrderItem = ({ item }) => {
    return (
     
        <View style={{ flexDirection: "row", padding: 10 }} key={item.id}>
        
        <View>
          <View>
            <Text className="text-[#CE4257] w-[250] font-semibold" numberOfLines={1} >{item.name}</Text>
            <Text className="text-xs py-1">ราคา {item.price}.00 บาท * {item.quantity}</Text>
          </View>
          
         
        </View>
      </View>
      
     
        
      
    );
  };


  return (
    <>
    <Tobtabs/>
    <View className="flex-1 justify-between items-center bg-white">
      <View>
        {loading ? (
            <ActivityIndicator size="large" color="#CE4257" />
         ) : (
           products.length>0 ?(
            <FlatList
            style={{}}
              data={products}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
           ) : (
            <View className='flex items-center justify-center h-full'>
              <Text className='text-[#CE4257]  font-bold'>ไม่มีสินค้าในตระกร้า</Text>
            </View>
            
           )
             
           
        
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
    
      <Button onPress={()=>actionSheetRef.current?.show()}  buttonStyle={{
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
      <ActionSheet ref={actionSheetRef} >

      <View className='flex h-[300]'>
        <View className='flex flex-row items-center justify-between pl-2 pr-2'>
        <Text className='text-[#CE4257] font-bold p-4'>ชำระเงิน</Text>
        <TouchableOpacity onPress={()=> actionSheetRef.current?.hide()}>
        <Icon name='close-circle-outline' type='ionicon'></Icon>
        </TouchableOpacity>
       
        </View>
        
        <View className='w-full'>
        <FlatList
              style={{}}
              data={products}
              renderItem={renderOrderItem}
              keyExtractor={(item) => item.id}
              ListFooterComponent={<View className='flex items-end'>
                <Text className='text-[#CE4257] font-bold p-4'>ราคารวม {total}.00 บาท</Text>
              </View>}
            />
        </View>
        <View className='flex flex-row justify-center m-2'>
        <Button onPress={orderItem} title={"สั่งซื้อสินค้า"} buttonStyle={{width:200,borderRadius:20,backgroundColor:'#720026'}} titleStyle={{fontWeight:'bold'}}/>

        </View>
      </View>


      </ActionSheet>
     
    </View>
    
    </>
    
  )
}
