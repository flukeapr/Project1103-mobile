import { View, Text, StyleSheet, Image } from "react-native";
import {useState,useEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "../src/screens/Homepage";
import Cart from "../src/screens/Cart";
import Chat from "../src/screens/Chat";
import Profile from "../src/screens/Profile";
import { Icon } from "@rneui/base";
import { useAccelerometer } from "../src/context/UseAccelerometerContext";

const Tab = createBottomTabNavigator();

export default function Main() {
  const [landscape ,setLandscape] = useState(false);
  const {isPortrait } = useAccelerometer();
 
  return (
    <>
     {isPortrait ? (
      <Tab.Navigator 
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 70 },
      }}
      
    >
      <Tab.Screen
        name="home"
        component={Homepage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#CE4257" : "white",
                padding: 7,
                borderRadius: 15,
              }}
            >
              <Icon
                name="home"
                color={focused ? "#fff" : "#CE4257"}
                type="ionicon"
                size={35}
              ></Icon>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#CE4257" : "white",
                padding: 7,
                borderRadius: 15,
              }}
            >
             
              <Icon
                name="cart"
                color={focused ? "#fff" : "#CE4257"}
                type="ionicon"
                size={35}
              ></Icon>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#CE4257" : "white",
                padding: 7,
                borderRadius: 15,
              }}
            >
              <Icon
                name="chatbox-ellipses"
                color={focused ? "#fff" : "#CE4257"}
                type="ionicon"
                size={35}
              ></Icon>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#CE4257" : "white",
                padding: 7,
                borderRadius: 15,
              }}
            >
              <Icon
                name="person-circle" 
                color={focused ? "#fff" : "#CE4257"}
                type="ionicon"
                size={35}
              ></Icon>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
    ):(
      <Tab.Navigator 
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 50 },
      }}
      
    >
      <Tab.Screen
        name="home"
        component={Homepage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#CE4257" : "white",
                padding: 7,
                width:60,
                borderRadius: 15,
              }}
            >
              <Icon
                name="home"
                color={focused ? "#fff" : "#CE4257"}
                type="ionicon"
                size={25}
              ></Icon>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#CE4257" : "white",
                padding: 7,
                width:60,
                borderRadius: 15,
              }}
            >
             
              <Icon
                name="cart"
                color={focused ? "#fff" : "#CE4257"}
                type="ionicon"
                size={25}
              ></Icon>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#CE4257" : "white",
                padding: 7,
                borderRadius: 15,
                width:60,
              }}
            >
              <Icon
                name="chatbox-ellipses"
                color={focused ? "#fff" : "#CE4257"}
                type="ionicon"
                size={25}
              ></Icon>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#CE4257" : "white",
                padding: 7,
                borderRadius: 15,
                width:60,
              }}
            >
              <Icon
                name="person-circle" 
                color={focused ? "#fff" : "#CE4257"}
                type="ionicon"
                size={25}
              ></Icon>
            </View>
          ),
        }}
      />
    </Tab.Navigator>

    )}
   
    </>
   
  );
}
