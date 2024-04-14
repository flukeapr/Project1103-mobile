import { View, Text ,StyleSheet,Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../src/components/Homepage';
import Cart from '../src/components/Cart';
import Chat from '../src/components/Chat';
import Profile from '../src/components/Profile';

const Tab = createBottomTabNavigator();
export default function Main() {
  return (
    <Tab.Navigator initialRouteName='home'
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { height: 70 }
      
    }}
    
    >
      <Tab.Screen name="home" component={Homepage} options={{
        tabBarIcon:({focused}) => (
          <View style={{alignItems:'center',justifyContent:'center', backgroundColor: focused ? '#CE4257' : 'white',padding:10 ,borderRadius:15}}>
            <Image source={require('../assets/homeIcon.png')} style={{width:25,height:25,tintColor: focused ? '#fff' : '#CE4257'}}></Image>
            
          </View>
        )
      }}
      />
      <Tab.Screen name="cart" component={Cart} options={{
        tabBarIcon:({focused}) => (
          <View style={{alignItems:'center',justifyContent:'center', backgroundColor: focused ? '#CE4257' : 'white',padding:10 ,borderRadius:15}}>
            <Image source={require('../assets/cartIcon.png')} style={{width:25,height:25,tintColor: focused ? '#fff' : '#CE4257'}}></Image>
            
          </View>
        )
      }}
      />
      <Tab.Screen name="chat" component={Chat} options={{
        tabBarIcon:({focused}) => (
          <View style={{alignItems:'center',justifyContent:'center', backgroundColor: focused ? '#CE4257' : 'white',padding:10 ,borderRadius:15}}>
            <Image source={require('../assets/chatIcon.png')} style={{width:25,height:25,tintColor: focused ? '#fff' : '#CE4257'}}></Image>
            
          </View>
        )
      }}/>
      <Tab.Screen name="profile" component={Profile} options={{
        tabBarIcon:({focused}) => (
          <View style={{alignItems:'center',justifyContent:'center', backgroundColor: focused ? '#CE4257' : 'white',padding:10 ,borderRadius:15}}>
            <Image source={require('../assets/profileIcon.png')} style={{width:25,height:25,tintColor: focused ? '#fff' : '#CE4257'}}></Image>
            
          </View>
        )
      }}/>
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  shadow:{
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})