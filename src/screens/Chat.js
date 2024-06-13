import { View, Text, StatusBar,ActivityIndicator,TouchableOpacity } from 'react-native';
import { useState, useEffect,useRef } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { useUserAuth } from '../context/UserAuthenContext';
import { collection, addDoc, query, orderBy, doc, onSnapshot, serverTimestamp,deleteDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from '@rneui/base';
import ActionSheet from 'react-native-actions-sheet';
import { Button } from '@rneui/themed';
import Toast from 'react-native-toast-message';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const { user } = useUserAuth();
  const uid = "U8R4oO9mGINMrY2yxoyscxerwhg2";
const [isLoading ,setIsLoading] = useState(true);
const actionSheetRef = useRef(null);
const [selectedMessage, setSelectedMessage] = useState([]);

  useEffect(() => {
      if (!user) {
          return; 
      }

      const docId = uid > user.uid ? `${user.uid}-${uid}` : `${uid}-${user.uid}`;
      const chatDoc = doc(db, "Chats", docId);
      const messagesCollection = collection(chatDoc, "messages");
      const q = query(messagesCollection, orderBy("createdAt", 'desc'));
      const unSubscribe = onSnapshot(q, (querySnap) => {
          const allMsg = querySnap.docs.map(docSnap => {
              const data = docSnap.data();
              return {
                  ...data,
                  id: docSnap.id,
                  createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
                  position: data.sendBy === user.uid ? 'right' : 'left',
              };
          });
          setMessages(allMsg);
          setIsLoading(false);
         
    
      });
      
      return () => unSubscribe();
  }, [user, uid]);

  const onSend = async (messages = []) => {
      if (!user) {
          return; 
      }

      const msg = messages[0];
      const myMsg = {
          ...msg,
          sendBy: user.uid,
          sentTo: uid,
          createdAt: serverTimestamp(),
          
      };

      setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));

      try {
          const docId = uid > user.uid ? `${user.uid}-${uid}` : `${uid}-${user.uid}`;
          const chatDocRef = doc(db, "Chats", docId);
          const messagesCollectionRef = collection(chatDocRef, "messages");
          await addDoc(messagesCollectionRef, myMsg);
      } catch (error) {
          console.error('Error sending message:', error);
      }
  };
  const handleLogPress = (context,message)=>{
    if(message.position === 'left'){
        return;
    }
    setSelectedMessage(message);
    actionSheetRef.current?.show();
   
  }
  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;

    try {
        const docId = uid > user.uid ? `${user.uid}-${uid}` : `${uid}-${user.uid}`;
        const chatDocRef = doc(db, "Chats", docId);
        const messageDocRef = doc(chatDocRef, "messages", selectedMessage.id);
        await deleteDoc(messageDocRef);

        Toast.show({
            type: 'success',
            text1: 'ลบข้อความสำเร็จ',
            text2: 'ข้อความถูกลบสำเร็จแล้วว!!',
        });
    } catch (error) {
        console.error('Error deleting message:', error);
    } finally {
        actionSheetRef.current?.hide();
    }
};

  if (!user) {
      return <Text>Loading...</Text>; 
  }

  return (
    <>
     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 100, width: '100%', backgroundColor: '#CE4257',paddingTop:StatusBar.currentHeight }}>
              <Text style={{ color: '#fff', fontSize: 22, paddingRight: 8 }}>Chat</Text>
              <Icon name="chatbubble-ellipses" type='ionicon' color={"#fff"} size={25} />
          </View>
        <GestureHandlerRootView style={{ flex: 1,  justifyContent: 'space-between',backgroundColor:'white' }} >
         {isLoading ? (
          <View className='flex items-center justify-center h-[700]'>
           <ActivityIndicator size="large" color="#CE4257" />
          </View>
         ) : (
           
                <GiftedChat
                onLongPress={handleLogPress}
            messages={messages}
           onSend={text =>onSend(text)}
            user={{
                _id: user.uid,
                avatar: user.photoURL,
                name: user.displayName,
            }}
            renderBubble={props => (
                <Bubble {...props} wrapperStyle={{
                    right: { backgroundColor: '#CE4257',borderColor:'black',borderWidth:1 },
                    left: { backgroundColor: 'white',borderColor:'black',borderWidth:1 },
                }} />
            )}
       
            
        />
           
            
         )}
        <ActionSheet ref={actionSheetRef}>
            <View className='h-[120] bg-white rounded-tr-lg rounded-tl-lg '>
                <View className='flex flex-row justify-between m-4'>
                <Text >คุณต้องการลบข้อความใช่ไหม?</Text>
                <TouchableOpacity onPress={()=> actionSheetRef.current?.hide()}>
        <Icon name='close-circle-outline' type='ionicon'></Icon>
        </TouchableOpacity>
                </View>
              
                <View className='flex items-center'>
                <Button title={'ยกเลิกการส่งข้อความ'} buttonStyle={{borderRadius:20,width:250,backgroundColor:'#ff9d8a'}} titleStyle={{fontSize:18, fontWeight:'bold'}} onPress={handleDeleteMessage}/>
            
                </View>
               
            </View>
        </ActionSheet>
        
      </GestureHandlerRootView>
    </>
      
  );
}
