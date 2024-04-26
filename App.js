import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { Text, View } from 'react-native';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Homepage from './src/components/Homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast,{ BaseToast, ErrorToast } from 'react-native-toast-message';
import { UserAuthContextProvider } from './src/context/UserAuthenContext';
import Main from './navigation/Main';
import ProductDetail from './src/components/ProductDetail';
import EditProfile from './src/components/EditProfile';
import ResetPass from './src/components/ResetPass';


const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green',
      borderLeftWidth:7,
      width:'90%',
      height:80,
      borderRightColor:'green',
      borderRightWidth:7
    }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
     style={{ borderLeftColor: 'red',
      borderLeftWidth:7,
      width:'90%',
      height:80,
      borderRightColor:'red',
      borderRightWidth:7
    }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),
 
};

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    
    <NavigationContainer>
      <UserAuthContextProvider>
      <Stack.Navigator>
      <Stack.Screen name="login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="register" component={Register} options={{headerShown: false}} />
      <Stack.Screen name="home" component={Homepage} options={{headerShown: false}} />
      <Stack.Screen name="main" component={Main} options={{headerShown: false}} />
      <Stack.Screen name="productDetail" component={ProductDetail} options={{headerShown: false}} />
      <Stack.Screen name="editprofile" component={EditProfile} options={{headerShown: false}} />
      <Stack.Screen name="resetpass" component={ResetPass} options={{headerShown: false}} />
    </Stack.Navigator>
    <Toast config={toastConfig} />
    
      </UserAuthContextProvider>
    
  </NavigationContainer>
  
  );
}


