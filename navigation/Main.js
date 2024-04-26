import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "../src/components/Homepage";
import Cart from "../src/components/Cart";
import Chat from "../src/components/Chat";
import Profile from "../src/components/Profile";
import { Icon } from "@rneui/base";

const Tab = createBottomTabNavigator();
export default function Main() {
  return (
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
  );
}
