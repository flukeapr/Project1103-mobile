import { View, Text,TouchableOpacity,Image,FlatList, ActivityIndicator, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection,getDocs } from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthenContext';
import { db } from '../config/Firebase';
import { Icon } from '@rneui/base';
import RenderStar from '../components/RenderStar';
export default function MyReview({navigation}) {
    const {user} = useUserAuth();
    const [review,setReview] = useState([])
    const [loading ,setLoading]= useState (true)
    const getMyReview = async ()=>{
        const userRef = collection(db,"Users", user.uid,"myReview");
        const querySnapshot =  await getDocs(userRef);
        const myReview =  querySnapshot.docs.map((doc) =>({
         id: doc.id,
         ...doc.data()
        }))
       
        setReview(myReview);
    }
    const renderItem = ({ item }) =>{
      
        
        return ( 
          

           
        <View style={{ flexDirection: "row", padding: 10 }} key={item.id}  className=' bg-[#fff] rounded-lg shadow-lg shadow-gray-950 m-2 '>
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 150, marginRight: 10 ,borderColor:'#CE4257',borderWidth:1,borderRadius:10} }
        />
        <View className='flex justify-between'>
            <View>
            <Text className="text-[#CE4257] w-[250] font-semibold" numberOfLines={1} >{item.book_name}</Text>
            <View className='flex flex-row p-1'><RenderStar Rate={item.Rate} Size={15}/></View>
            <Text>{item.Comment}</Text>
            </View>
            
            <View className='flex items-end p-1'>
                <Text>{item.Date}</Text>
            </View>
          
          
          
        </View>
      </View>
     )
    }
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus',()=>{
            getMyReview().then(()=>setLoading(false))
        })
        return unsubscribe;
    },[navigation])
  return (

    <View className='bg-white'>
      <View className="flex-4 px-2 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:100,paddingTop:StatusBar.currentHeight}}>
            <TouchableOpacity 
            className='flex flex-row p-2 items-center'
            onPress={() => navigation.navigate("profile")}>
            <Image source={require('../../assets/prev.png')}></Image>
            <Text className='text-[#fff] text-lg ml-8'>รีวิวของฉัน</Text>
            </TouchableOpacity>
       
        </View>
       
            {loading ? (
                <View className='flex items-center justify-center h-[700]'>
                    <ActivityIndicator size="large" color="#CE4257" />
                </View> 
                
            ):(
                review.length>0 ? (
                    
            <FlatList 
            data={review}
            renderItem={renderItem}
            keyExtractor={(item)=> item.id}
            /> 
                ):(
                    <View className='flex items-center justify-center h-[700]'>
                        <Text className="text-[#CE4257] text-lg font-bold">ยังไม่มีรีวิว</Text>
                    </View>
                    
                )
                
            )}
            
        
    </View>
  )
}