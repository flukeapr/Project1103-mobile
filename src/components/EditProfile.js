import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'

export default function EditProfile({navigation}) {
  return (
    <View>
       <View className="flex-4 px-2 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:100}}>
            <TouchableOpacity 
            className='flex flex-row p-2 items-center'
            onPress={() => navigation.navigate("profile")}>
            <Image source={require('../../assets/prev.png')}></Image>
            <Text className='text-[#fff] text-lg ml-8'>แก้ไขโปรไฟล์</Text>
            </TouchableOpacity>
       
        
        </View>
    </View>
  )
}