import { View, Text,TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ButtonPageProfile(props) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity className='m-8 text-center items-center ' onPress={() => navigation.navigate(`${props.page}`)}>
    <View className='rounded-full w-20 h-20 bg-[#CE4257] justify-center ' >
      <Icon name={props.icon} color="white" type='ionicon' size={50} ></Icon>
    </View>
    <Text className='text-[#CE4257] text-sm font-bold p-2'>{props.name}</Text>
  </TouchableOpacity>

  )
}