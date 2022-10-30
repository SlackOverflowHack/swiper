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
import { Localize } from '../localized';

const ChatScreen = () => {
  const tw = useTailwind();
  const { user } = useAuth();
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    setInput('');
  };
  return (
    <SafeAreaView style={tw('flex-1')}>
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
            placeholder={Localize('send-message')}
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
