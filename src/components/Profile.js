import { View, Text } from 'react-native'
import React from 'react';
import { Button } from '@rneui/base';

export default function Profile({ navigation }) {
  const handleLogout = async () => {
    // await logOut();
    navigation.navigate("login");
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  )
}