import { View, Text, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { useUserAuth } from '../context/UserAuthenContext';
import { collection, addDoc, query, orderBy, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from '@rneui/base';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const { user } = useUserAuth();
  const uid = "U8R4oO9mGINMrY2yxoyscxerwhg2";

  useEffect(() => {
      if (!user) {
          return; 
      }

      const docId = uid > user.uid ? `${user.uid}-${uid}` : `${uid}-${user.uid}`;
      const chatDoc = doc(db, "Chats", docId);
      const messagesCollection = collection(chatDoc, "messages");
      const q = query(messagesCollection, orderBy("createdAt", 'desc'));
      const unSubscribe = onSnapshot(q, (querySnap) => {
          const allmsg = querySnap.docs.map(docSnap => {
              const data = docSnap.data();
              return {
                  ...data,
                  createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
                  position: data.sendBy === user.uid ? 'right' : 'left',
              };
          });
          setMessages(allmsg);
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

  if (!user) {
      return <Text>Loading...</Text>; 
  }

  return (
      <GestureHandlerRootView style={{ flex: 1, paddingTop: StatusBar.currentHeight, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40, width: '100%', backgroundColor: '#CE4257' }}>
              <Text style={{ color: '#fff', fontSize: 18, paddingRight: 8 }}>Chat</Text>
              <Icon name="chatbubble-ellipses" type='ionicon' color={"#fff"} size={20} />
          </View>
          <GiftedChat
              messages={messages}
              onSend={messages => onSend(messages)}
              user={{
                  _id: user.uid,
              }}
              renderBubble={props => (
                  <Bubble {...props} wrapperStyle={{
                      right: { backgroundColor: '#CE4257' },
                      left: { backgroundColor: 'white' },
                  }} />
              )}
          />
        
      </GestureHandlerRootView>
  );
}
