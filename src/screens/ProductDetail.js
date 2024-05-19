import { View, Text ,Image,TouchableOpacity, ScrollView,FlatList, StatusBar} from 'react-native'
import React, { useEffect ,useState} from 'react'
import { Button, Skeleton } from '@rneui/base';
import { db } from "../config/Firebase";
import { collection, doc ,getDoc, getDocs,where,query,updateDoc,addDoc,increment} from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { useUserAuth } from '../context/UserAuthenContext';
import { Icon } from '@rneui/themed';
import RenderStar from '../components/RenderStar';
import * as Speech from 'expo-speech'
import { useAccelerometer } from '../context/UseAccelerometerContext';
import { useFonts } from 'expo-font';
export default function ProductDetail({navigation,route}) {
    const {id}=route.params
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const {user} = useUserAuth();
    const [isplay,setIsplay] = useState(false);
  const {isPortrait} = useAccelerometer();

    const addToCart = async ()=>{
      try {
        const cartRef = collection(db, 'Users', user.uid, 'Cart');
        const q = query(cartRef, where('book_id', '==', id));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          // หากมีสินค้าอยู่ในตะกร้าอยู่แล้ว
          const docSnap = querySnapshot.docs[0];
          await updateDoc(doc(docSnap.ref.parent.parent, 'Cart', docSnap.id), {
            quantity: increment(1),
            total: increment(product.price) // เพิ่มปริมาณขึ้นทีละ 1
          });
        } else {
          
          // หากไม่มีสินค้าในตะกร้า
          await addDoc(cartRef, {
            book_id: id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
            date: new Date(),
            total: product.price
          });
        }
       
        Toast.show({
          type: 'success',
          text1: 'เพิ่มสินค้าสำเร็จ',
          text2: 'กรุณาตรวจสอบสินค้าในตะกร้า',
         visibilityTime:2000,
        })
      } catch (error) {
        console.error('Error adding to cart: ', error);
      }
       
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
        <View className='flex flex-row mt-4 w-full '>
      <View className='flex flex-row w-[200]  items-center'>
        <Image source={require('../../assets/ProflieThumbnail_reivew.png')} />
        <View className='ml-2 mb-4 w-[200]'>
       
          <Text className='text-[#565656] text-sx pt-1 '>{item.User}</Text>
          <Text className='text-[#565656]'>{item.Comment} </Text>
          <View className='flex flex-row'>
          <RenderStar Rate={item.Rate} Size={10}/>
          </View>
          
        </View>
      </View>
      <View className='flex justify-end'>
        <Text className='text-[#565656]'>{item.Date}</Text>
        
      </View>
    </View>
        
      );
    };

   
      if(isplay){
        Speech.speak(product.story);
      }else{
        Speech.stop();
      }
      
    
  return (
    <>
     
           <View className='flex-1 justify-between bg-white'>
           <View className="flex-4 px-2 items-center  bg-[#CE4257] " style={{flexDirection:'row',height:100,paddingTop:StatusBar.currentHeight}}>
               <TouchableOpacity onPress={() => navigation.navigate("main")}>
               <Image source={require('../../assets/prev.png')}></Image>
              
               </TouchableOpacity>
           </View>
           
          
           {loading ? (
             <View className='flex-1 bg-white items-center pt-10' >
             <Skeleton 
              width={300}
              height={450}
              style={{borderWidth:1,borderRadius:10}}>
               
              </Skeleton>
              <Skeleton  width={300} height={20} style={{borderRadius:20,margin:6}}></Skeleton>
              <Skeleton  width={300} height={20} style={{borderRadius:20,margin:6}}></Skeleton>
              <Skeleton  width={300} height={20} style={{borderRadius:20,margin:6}}></Skeleton>
             </View>
           ) : (
           
             <View className='flex-1 bg-white items-center pt-10 mb-4'>
              
            
           <FlatList
             ListHeaderComponent={<View >
                  <Image source={{uri:product.image}}  style={{ width: 300, height: 450, marginRight: 10 ,borderColor:'#CE4257',borderWidth:1,borderRadius:10,justifyContent:'center'} }></Image>
           <Text className='w-[300] text-lg text-[#CE4257] font-semibold my-2 text-ellipsis' style={{fontSize:18}}>{product.name}</Text>
           <Text style={{fontSize:16}}>สำนักพิมพ์ {product.publisher}</Text>
   
           <View className='flex flex-row pt-2 items-center'>
             <Image source={require('../../assets/star.png')} ></Image>
           <Text style={{fontSize:16}}> {product.reviews} รีวิว</Text>
   
           </View>
           <Text className='pt-4' style={{fontSize:16}}>เนื้อเรื่องโดยย่อ</Text>
           <Text className='w-[300]' style={{fontSize:16}}>{product.story}</Text>
           <View className='flex flex-row items-center justify-center m-2'>
             <Button title={"กดเพื่อฟังเนื้อเรื่อง"} titleStyle={{fontSize:18,fontWeight:'bold'}} buttonStyle={{width:200,borderRadius:20,backgroundColor:'#ff9d8a' }} onPress={()=>setIsplay(!isplay)}/>
           </View>
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
         <Button  buttonStyle={{
                   backgroundColor: '#D9D9D9',
                   width: 210,
                   height: 60,
   
                 }}
                 title={`${product.price}.00 บาท`}
                 titleStyle={{ color: '#CE4257',fontWeight:'bold' }}></Button>
       
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
     
        
        
        
        
      {/* <View className=' flex-row justify-between'>
      <Button  buttonStyle={{
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
      </View> */}
     
    
      
    
    </>
   

  )
}