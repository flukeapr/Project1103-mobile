import { View, Text,ActivityIndicator ,FlatList,Image,TouchableOpacity,StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { Button,Icon,Overlay } from "@rneui/base";
import { useUserAuth } from "../context/UserAuthenContext";
import Tobtabs from "../components/Tobtabs";
import { db } from "../config/Firebase";
import { doc, getDocs, collection ,query, where } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import { useAccelerometer } from "../context/UseAccelerometerContext";
import { useFonts } from "expo-font";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

export default function Homepage({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { logOut } = useUserAuth();
  const [visible, setVisible] = useState(false);
const [landscape ,setLandscape] = useState(false);
const {isPortrait} = useAccelerometer();

  
  const getBooks = async () => {
    try {
      let bookQuery = collection(db, "Book");
      
      const querySnapshot = await getDocs(bookQuery);

      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
     
      setProducts(productsData);
      
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBooks().then(() => {
        setLoading(false);
      });
    });
    return unsubscribe;

  },[navigation]);



  
  const renderItem = ({ item }) => {
    return (
      <View>
         <ProductCard id={item.id} image={item.image} name={item.name} publisher={item.publisher} price={item.price} reviews={item.reviews}/>
      
      </View>
     
      
    );
  };
  return (
    <>
      <Tobtabs onSearch={setSearchText} />
      <View className="flex-1 items-center justify-center bg-white" style={{width:'100%'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#CE4257" />
      ) : (
        
        <FlatList
        
          data={products.filter((prod) => {
            if (searchText === "") {
              return prod;
            } else if (prod.name.includes(searchText)) {
              
              return prod;
            }
          })}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={isPortrait ? 1 : 2}
          key={isPortrait ? 'portrait' : 'landscape'}
        />
      )}
      


      </View>
    </>
  );
}
