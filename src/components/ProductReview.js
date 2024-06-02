import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react';
import RenderStar from './RenderStar';
import { Icon } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import { useUserAuth } from '../context/UserAuthenContext';
import { collection, deleteDoc,doc, updateDoc,increment } from 'firebase/firestore';
import { db

 } from '../config/Firebase';
export default function ProductReview({ id, image, book_name, Comment, Rate, Date, getReview,book_id }) {
  const {user}= useUserAuth();

  // delete Review from firebase && รับ props ทั้งหมดมาจากหน้า MyReview เพื่อใช่ใน components นี้
  const handleDeleteReview = async ()=>{
    try {
      const docRef = doc(db, "Users", user.uid);
      const reviewRef = doc(docRef,'myReview', id)
      
      await deleteDoc(reviewRef);

      const bookDoc = doc(db,'Book',book_id,'Review',id)
      await deleteDoc(bookDoc);
      const bookDocUpdate = doc(db,'Book',book_id)
      await updateDoc(bookDocUpdate,{
        reviews: increment(-1)
      })
      const orderRef = doc(db,"Orders",id)
      await updateDoc(orderRef,{
        status: "รอชำระเงิน"
      })
      
      Toast.show({
        type: 'success',
        text1: 'ลบการรีวิวสำเร็จ',
        text2: 'การรีวิวถูกลบสำเร็จแล้วว!!',
      })
      getReview();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'เกิดข้อผิดพลาด',
        text2: 'กรุณาลองใหม่อีกครั้ง',
      })
      console.log(error);
    }
  }
  return (
    
    <View style={{ flexDirection: "row", padding: 10 }} key={id}  className=' bg-[#fff] rounded-lg shadow-lg shadow-gray-950 m-2 '>
    <Image
      source={{ uri: image }}
      style={{ width: 100, height: 150, marginRight: 10 ,borderColor:'#CE4257',borderWidth:1,borderRadius:10} }
    />
    <View className='flex justify-between'>
        <View>
          <View className='flex flex-row'>
          <Text className="text-[#CE4257] w-[220] font-semibold" style={{fontSize:18}} numberOfLines={1} >{book_name}</Text>
          <TouchableOpacity className='border border-solid  rounded-full w-[30] h-[30] items-center justify-center ml-1' onPress={handleDeleteReview}>
              <Icon name='trash-outline' type='ionicon' size={20} > </Icon>
              </TouchableOpacity>
            </View>
       
        <View className='flex flex-row p-1'><RenderStar Rate={Rate} Size={15}/></View>
        <Text>{Comment}</Text>
        </View>
        
        <View className='flex items-end p-1'>
            <Text>{Date}</Text>
        </View>
      
      
      
    </View>
  </View>
  )
}