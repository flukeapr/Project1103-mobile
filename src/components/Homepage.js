import { View, Text,ActivityIndicator ,FlatList,Image,TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Button,Icon,Overlay } from "@rneui/base";
import { useUserAuth } from "../context/UserAuthenContext";
import Tobtabs from "./Tobtabs";
import { db } from "../config/Firebase";
import { doc, getDocs, collection ,query, where } from "firebase/firestore";



export default function Homepage({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { logOut } = useUserAuth();
  const [visible, setVisible] = useState(false);
  const [results, setResults] = useState('');
  const [isRecording , setIsRecording] = useState(false);
  const [error, setError] = useState('');
  
  
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
    getBooks().then(() => setLoading(false));
  }, []);
  const toggleOverlay = () => {
    setVisible(!visible);
    
  };

  
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("productDetail", { id: item.id })}>
        <View style={{ flexDirection: "row", padding: 10 }} >
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 150, marginRight: 10 ,borderColor:'#CE4257',borderWidth:1,borderRadius:10} }
        />
        <View>
          <Text className="text-[#CE4257] w-[250]" numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
          <Text className="text-xs py-1 ]">สำนักพิมพ์ {item.publisher}</Text>
          <Text className="text-xs py-1">{item.price}.00 บาท</Text>
          <Image source={require('../../assets/star.png')}></Image>
        </View>
      </View>
      </TouchableOpacity>
      
    );
  };
  return (
    <>
      <Tobtabs onSearch={setSearchText} Visible={setVisible} toggleOverlay={toggleOverlay}/>
      <View className="flex-1 items-center justify-center bg-white">
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
        />
      )}
       {/* <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width:300,height:300,backgroundColor:'white',borderRadius:10}} >
        <View className='flex justify-center items-center h-full'>
          <Icon name={isRecording ? "mic-off" : "mic"} color="black" size={50} onPress={()=>(isRecording? stopRecording :startRecording  )}/>
          <Text>{results}</Text>
        </View>
      </Overlay> */}


      </View>
    </>
  );
}
