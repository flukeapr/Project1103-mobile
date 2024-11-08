import { StatusBar } from 'expo-status-bar';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Homepage from './src/screens/Homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast,{ BaseToast, ErrorToast } from 'react-native-toast-message';
import { UserAuthContextProvider } from './src/context/UserAuthenContext';
import Main from './navigation/Main';
import ProductDetail from './src/screens/ProductDetail';
import EditProfile from './src/screens/EditProfile';
import ResetPass from './src/screens/ResetPass';
import ReviewBook from './src/screens/ReviewBook';
import MyReview from './src/screens/MyReview';
import { AccelerometerProvider } from './src/context/UseAccelerometerContext';
import MyOrder from './src/screens/MyOrder';
import { StripeProvider } from '@stripe/stripe-react-native';


// font Header (Bebas Neue) + Body (Roboto)
// Alert config กำหนดค่าต่างๆของตัว Alert
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
      height:75,
      borderRightColor:'white',
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
      height:75,
      borderRightColor:'white',
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
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'blue',
      borderLeftWidth:7,
      width:'90%',
      height:75,
      borderRightColor:'white',
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
  const STRIPE_KEY ='pk_test_51PGKc0EsI8llu3oDeskAqIH7UsdaJ5RUliyq9fv7w292YDksrB1m2gK477DtJ5w12MtIG18KE3mRFkfSEfbfSD1K00jB7CeSFX';
  return (
    
  
    <AccelerometerProvider>
      {/* sensor */}
      <StripeProvider publishableKey={STRIPE_KEY}>
        {/* payment */}
        <NavigationContainer>
          {/* navigation */}
          <UserAuthContextProvider>
            {/* Authentication */}
            <Stack.Navigator initialRouteName='login'>
              {/* screens */}
              <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
              <Stack.Screen name="home" component={Homepage} options={{ headerShown: false }} />
              <Stack.Screen name="main" component={Main} options={{ headerShown: false }} />
              <Stack.Screen name="productDetail" component={ProductDetail} options={{ headerShown: false }} />
              <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
              <Stack.Screen name="resetpass" component={ResetPass} options={{ headerShown: false }} />
              <Stack.Screen name="reviewBook" component={ReviewBook} options={{ headerShown: false }} />
              <Stack.Screen name='myReview' component={MyReview} options={{ headerShown: false }} />
              <Stack.Screen name='MyOrders' component={MyOrder} options={{ headerShown: false }} />
            </Stack.Navigator>
            <Toast config={toastConfig} />
          </UserAuthContextProvider>
          <StatusBar style='auto' />
        </NavigationContainer>
      </StripeProvider>
    </AccelerometerProvider>

  );
}


