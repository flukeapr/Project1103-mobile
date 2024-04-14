import { View, Text,ActivityIndicator ,FlatList,Image } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "@rneui/base";
import { useUserAuth } from "../context/UserAuthenContext";
import Tobtabs from "./Tobtabs";
import { db } from "../config/Firebase";
import { doc, getDocs, collection ,query, where } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../config/Firebase";
export default function Homepage({ navigation }) {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { logOut } = useUserAuth();
  
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
    getBooks();
  }, []);
  useEffect(() => {
    listAll(ref(storage, "Book")).then((res) => {
      const promises = res.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImages(urls);
        setLoading(false); // เมื่อโหลดเสร็จให้เปลี่ยนสถานะ loading เป็น false
      });
    });
  }, []);

  
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Image
          source={{ uri: images.find((image) => image.includes(item.id)) }}
          style={{ width: 100, height: 150, marginRight: 10 }}
        />
        <View>
          <Text className="text-[#CE4257] w-[250]" numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
          <Text className="text-xs py-1">สำนักพิมพ์ {item.publisher}</Text>
          <Text className="text-xs py-1">{item.price}.00 บาท</Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <Tobtabs onSearch={setSearchText}/>
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
       
      </View>
    </>
  );
}
