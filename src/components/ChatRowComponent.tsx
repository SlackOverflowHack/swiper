import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useTailwind } from 'tailwind-rn/dist';
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query
} from '@firebase/firestore';
import { firebaseDb } from '../firebase';

interface Props {
  chat: ChatMatch;
}

const ChatRowComponent: React.FC<Props> = ({ chat }) => {
  const { user } = useAuth();
  const tw = useTailwind();
  const [matchedUserIfno, setmatchedUserIfno] = useState(
    getMatchedUserInfo(chat.users, user?.uid!)
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Chat'>>();
  const [lastMessage, setLastMessage] = useState<
    { message: string; sender: string } | undefined
  >();
  useEffect(() => {
    setmatchedUserIfno(getMatchedUserInfo(chat.users, user?.uid!));
    return onSnapshot(
      query(
        collection(firebaseDb, 'messages', chat.id, 'messages'),
        orderBy('timestamp', 'desc'),
        limit(1)
      ),
      (snapshot) => {
        if (snapshot.size === 1) {
          setLastMessage({
            message: snapshot.docs[0].data().message,
            sender: snapshot.docs[0].data().userId
          });
        }
      }
    );
  }, [user, chat]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', chat)}
      style={[
        tw('flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg'),
        styles.cardShadow
      ]}
    >
      <Image
        source={{
          uri: matchedUserIfno.photoUrl
        }}
        style={tw('w-16 h-16 rounded-full mr-4')}
      />
      <View>
        <Text style={tw('text-lg font-semibold')}>
          {matchedUserIfno.displayName}
        </Text>
        <Text>
          {lastMessage
            ? `${
                lastMessage.sender === user?.uid!
                  ? 'You'
                  : matchedUserIfno.displayName.split(' ')[0]
              }: ${lastMessage.message}`
            : 'Say hi!'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRowComponent;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});
