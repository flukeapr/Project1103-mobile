import { View, Text ,Image,TouchableOpacity, ScrollView,FlatList} from 'react-native'
import React, { useEffect ,useState} from 'react'
import { Button, Skeleton } from '@rneui/base';
import { db } from "../config/Firebase";
import { collection, doc ,getDoc, getDocs} from "firebase/firestore";
import Toast from 'react-native-toast-message';


export default function ProductDetail({navigation,route}) {
    const {id}=route.params
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const addToCart = ()=>{
        Toast.show({
            type: 'success',
            text1: 'เพิ่มสินค้าสำเร็จ',
            text2: 'กรุณาตรวจสอบสินค้าในตะกร้า',
           visibilityTime:2000,
          })
    }
    
    const getProductDetail = async () => {
        try {
          const productDoc = doc(db, "Book", id);
          const productSnapshot = await getDoc(productDoc);
          const productData = productSnapshot.data();
          const reviewsDoc = collection(db, 'Book',id, 'Review')
          const reviewSnapshot = await getDocs(reviewsDoc);
          const reviewData = reviewSnapshot.docs.map((doc) => {return{id: doc.id, ...doc.data()}});
          productData.Review = reviewData;
          
          setProduct(productData);
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
    }

    useEffect(() => {
        getProductDetail().then(() => setLoading(false));
        
    })
    const renderItem = ({ item }) => {
      return (
        <View className='flex flex-row mt-4 w-full'>
      <View className='flex flex-row w-[200] items-center'>
        <Image source={require('../../assets/ProflieThumbnail_reivew.png')} />
        <View className='ml-2'>
          <Text className='text-[#565656] text-sx pt-1'>{item.User}</Text>
          <Text className='text-[#565656]'>{item.Comment}</Text>
        </View>
      </View>
      <View className='flex justify-end'>
        <Text className='text-[#565656]'>{item.Date}</Text>
      </View>
    </View>
        
      );
    };
  return (
    <View className='flex-1 justify-between bg-white'>
        <View className="flex-4 px-2 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:100}}>
            <TouchableOpacity onPress={() => navigation.navigate("main")}>
            <Image source={require('../../assets/prev.png')}></Image>
            </TouchableOpacity>
        </View>
        
       
        {loading ? (
          <View className='flex-1 bg-white items-center pt-10' >
          <Skeleton 
           width={300}
           height={450}
           style={{borderColor:'#CE4257',borderWidth:1,borderRadius:10}}>
            
           </Skeleton>
           <Skeleton  width={300} height={20} style={{borderRadius:20,margin:6}}></Skeleton>
           <Skeleton  width={300} height={20} style={{borderRadius:20,margin:6}}></Skeleton>
           <Skeleton  width={300} height={20} style={{borderRadius:20,margin:6}}></Skeleton>
          </View>
        ) : (
          <View className='flex-1 bg-white items-center pt-10 mb-4'>
           
         
        <FlatList
          ListHeaderComponent={<View>
               <Image source={{uri:product.image}}  style={{ width: 300, height: 450, marginRight: 10 ,borderColor:'#CE4257',borderWidth:1,borderRadius:10} }></Image>
        <Text className='text-lg text-[#CE4257] font-semibold my-2'>{product.name}</Text>
        <Text>สำนักพิมพ์ {product.publisher}</Text>
        <View className='flex flex-row pt-2 items-center'>
          <Image source={require('../../assets/star.png')} ></Image>
        <Text> {product.reviews} รีวิว</Text>

        </View>
        <Text className='pt-4'>เนื้อเรื่องโดยย่อ</Text>
        <Text className='w-[300]'>{product.story}</Text>
          <View className=''>
          <Text className='text-lg text-[#CE4257] font-semibold mt-6'>รีวิวหนังสือ</Text>
          <View className='flex flex-row pt-2 items-center'>
          <Image source={require('../../assets/star.png')} ></Image>
        <Text> {product.reviews} รีวิว</Text>
          
        </View>
        </View>
          </View>}
          data={product.Review}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
           
         
         
           
       
        </View>
        )}
        
        
        
      <View className=' flex-row justify-between'>
      <Button   buttonStyle={{
                backgroundColor: '#D9D9D9',
                width: 210,
                height: 60,

              }}
              title={`${product.price}.00 บาท`}
              titleStyle={{ color: '#CE4257',fontWeight:'100' }}></Button>
    
      <Button onPress={addToCart} buttonStyle={{
                backgroundColor: '#720026',
                width: 210,
                height: 60,
              }}
              titleStyle={{ color: 'white',fontWeight:'bold' }}
              title={"เพิ่มเข้าตระกร้า"} 
              iconRight={true} 
              icon={<Image source={require('../../assets/smallCart.png')}
               style={{width:30,height:30}}
               />}></Button>
      </View>
     
    </View>

  )
}