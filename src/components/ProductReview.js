import { View, Text,Image } from 'react-native'
import React from 'react';
import RenderStar from './RenderStar';

export default function ProductReview(props) {
  return (
    <View style={{ flexDirection: "row", padding: 10 }} key={props.id}  className=' bg-[#fff] rounded-lg shadow-lg shadow-gray-950 m-2 '>
    <Image
      source={{ uri: props.image }}
      style={{ width: 100, height: 150, marginRight: 10 ,borderColor:'#CE4257',borderWidth:1,borderRadius:10} }
    />
    <View className='flex justify-between'>
        <View>
        <Text className="text-[#CE4257] w-[250] font-semibold" style={{fontSize:18}} numberOfLines={1} >{props.book_name}</Text>
        <View className='flex flex-row p-1'><RenderStar key={props.id} Rate={props.Rate} Size={15}/></View>
        <Text>{props.Comment}</Text>
        </View>
        
        <View className='flex items-end p-1'>
            <Text>{props.Date}</Text>
        </View>
      
      
      
    </View>
  </View>
  )
}