import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeaderComponent from '../components/ChatHeaderComponent';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo';
import useAuth from '../hooks/useAuth';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';
import {
  addDoc,
  onSnapshot,
  collection,
  serverTimestamp,
  query,
  orderBy
} from '@firebase/firestore';
import { firebaseDb } from '../firebase';

const ChatScreen = () => {
  const tw = useTailwind();
  const { user } = useAuth();
  const {
    params: { users, usersMatched, id }
  } = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const matchedUser = getMatchedUserInfo(users, user?.uid!);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    await addDoc(collection(firebaseDb, 'messages', id, 'messages'), {
      userId: user?.uid!,
      message: input,
      timestamp: serverTimestamp()
    });

    setInput('');
  };

  useEffect(() => {
    return onSnapshot(
      query(
        collection(firebaseDb, 'messages', id, 'messages'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: (doc.data() as Message).message,
            userId: (doc.data() as Message).userId
          }))
        );
      }
    );
  }, [id]);

  return (
    <SafeAreaView style={tw('flex-1')}>
      <ChatHeaderComponent
        image={matchedUser.photoUrl}
        title={matchedUser.displayName}
        callEnabled={true}
        route='Chats'
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw('flex-1')}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            inverted
            data={messages}
            renderItem={({ item }) =>
              item.userId === user?.uid! ? (
                <SenderMessage message={item} />
              ) : (
                <ReceiverMessage
                  message={item}
                  photoUrl={matchedUser.photoUrl}
                />
              )
            }
            keyExtractor={(v) => v.id}
          />
        </TouchableWithoutFeedback>
        <View
          style={tw(
            'flex-row justify-between items-center border-t border-gray-200 px-5 py-2'
          )}
        >
          <TextInput
            style={tw('h-10 text-lg w-4/5')}
            placeholder='Send Message...'
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button title='Send' onPress={sendMessage} color='#FF5864' />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
