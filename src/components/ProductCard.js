import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Animated, { FadeInRight } from 'react-native-reanimated';
export default function ProductCard(props) {
    const navigation = useNavigation();
  
  return (
    <TouchableOpacity key={props.id} onPress={() => navigation.navigate("productDetail", { id: props.id })}>
      {/* รับ props จากหน้า HomePage ข้อมลหนังสือมาใส่ใน components นี้ */}
        <Animated.View entering={FadeInRight.delay(200).duration(1000).springify()} style={{ flexDirection: "row", padding: 10 }} className=' bg-[#fff] rounded-lg shadow-lg shadow-gray-950 m-2'>
          {/* image */}
        <Image
          source={{ uri: props.image }}
          style={{ width: 100, height: 150, marginRight: 10 ,borderColor:'#CE4257',borderWidth:1,borderRadius:10} }
        />
        
        <View>
          {/* name */}
          <Text className="text-[#CE4257] w-[250] font-semibold" style={{fontSize:16}} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
          {/* author */}
          <Text className="text-xs pt-2 " style={{fontSize:14}}>สำนักพิมพ์ {props.publisher}</Text>
          {/* price */}
          <Text className="text-xs pt-2" style={{fontSize:14}}>ราคา {props.price}.00 บาท</Text>
          {/* reviews start local  */}
          <View className='flex flex-row items-center'>
          <Image source={require('../../assets/star.png')}></Image><Text> {props.reviews} </Text>
          </View>
        </View>
      </Animated.View >
      </TouchableOpacity>
  )
}