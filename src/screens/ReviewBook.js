import { View, Text,TouchableOpacity,Image,TextInput,KeyboardAvoidingView,Platform, StatusBar } from 'react-native'
import React,{useState} from 'react';
import { CheckBox, Icon } from '@rneui/themed';
import { Button } from '@rneui/base';
import moment from 'moment';
import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthenContext';
import Toast from 'react-native-toast-message';
import { db } from '../config/Firebase';
import RenderStar from '../components/RenderStar';



export default function ReviewBook({navigation,route}) {
    const {product} = route.params
  const {user} = useUserAuth();
const [rating, setRating] = useState(3);
const [review, setReview] = useState('');

const getFormattedDate = () => {
    // Set the locale to Thai
    moment.locale('th');
  
    // Get the current date and time
    const now = moment();
  
    // Format the date to DD/MM/YYYY HH:mm with Buddhist Era year
    const formattedDate = now.add(543, 'years').format('DD/MM/YYYY HH:mm');
  
    return formattedDate;
  };
  
  // Example usage
  const dateStr = getFormattedDate();
  

    const handleReview = async ()=>{

        if(!review){
            Toast.show({
                type: 'error',
                text1: 'กรุณากรอกข้อความ',
                text2: 'กรุณากรอกข้อความ'
            })
            return;
        }
       
        try {
            const docRef = collection(db, "Book",product.book_id,"Review")
            await addDoc(docRef,{
                Rate: rating,
                Date: dateStr,
                User: user.email,
                Comment: review
            })
            const myReviewRef = collection(db, "Users",user.uid,"myReview")
                await addDoc(myReviewRef,{
                    book_name:product.book_name,
                    Rate: rating,
                    Comment: review,
                    Date: dateStr,
                    image: product.image
                })
            const UpdateBookRef = doc(db,"Book",product.book_id)
            await updateDoc(UpdateBookRef,{
                reviews: increment(1)
            })
            const updateOrderRef = doc(db,"Orders",product.id)
            await updateDoc(updateOrderRef,{
                review:"รีวิวแล้ว"
            })
                Toast.show({
                    type: 'success',
                    text1: 'บันทึกข้อมูลสำเร็จ',
                    text2: 'ขอบคูณสำหรับการรีวิวหนังสือ'
                })
                navigation.navigate('orderdetails')
            }catch(error){
                console.error(error);
                Toast.show({
                    type: 'error',
                    text1: 'เกิดข้อผิดพลาด',
                    text2: 'กรุณาลองใหม่อีกครั้ง'
                })
            }
        
    }

const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)} className='p-1'>
          <Icon
            name={i <= rating ? 'star' : 'star-outline'}
            type='ionicon'
            size={40}
            color={i <= rating ? '#FFC107' : '#000'}
          />
        </TouchableOpacity>
      );
    }
    
    return stars;
  };


  return (
  
  
    <View className='flex-1 flex bg-[#fff]'>
        <View className="flex-4 px-2 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:100,paddingTop:StatusBar.currentHeight}}>
            <TouchableOpacity 
            className='flex flex-row p-2 items-center'
            onPress={() => navigation.navigate("OrderDetails")}>
            <Image source={require('../../assets/prev.png')}></Image>
            <Text className='text-[#fff] text-lg ml-8'>รีวิวหนังสือ</Text>
            </TouchableOpacity>
       
        </View>
        

     
        <View className='flex items-center'>
            <Image source={{uri: product.image}}  style={{ width: 200, height: 300, margin:10,borderColor:'#CE4257',borderWidth:1,borderRadius:10} }/>
            <Text className='font-bold text-[#CE4257] text-lg'>{product.book_name}</Text>
            
           <View className='flex flex-row m-2'>
           {renderStars()}
           </View>
           <TextInput
       className='w-[300] h-[200] border-[##D9D9D9] border-solid border-1 rounded-md p-2  bg-[#F2F2F2]'
       style={{verticalAlign:'top'}}
        placeholder='คำอธิบาย'
        value={review}
        onChangeText={setReview}
        multiline
      />
           <Button onPress={handleReview} title={"บันทึก"} titleStyle={{fontWeight:'900',fontSize:18}} buttonStyle={{width:200,height:40,borderRadius:15,backgroundColor:'#ff9d8a'}} containerStyle={{margin:10}}/>
        </View>
       
    </View>
    
  )
}