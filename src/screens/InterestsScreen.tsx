import { View, Text, Button } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  CompositeNavigationProp,
  useNavigation
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { TabStackParamList } from '../navigation/TabNavigator';
import { ProfilesScreenNavigationProp } from './ProfilesScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeaderComponent from '../components/ChatHeaderComponent';
import { onSnapshot, collection, query, where } from '@firebase/firestore';
import { firebaseDb } from '../firebase';
import useAuth from '../hooks/useAuth';
import { useTailwind } from 'tailwind-rn/dist';
import ChatListComponent from '../components/ChatListComponent';

export type ChatsScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Chats'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const InterestsScreen = () => {
  const navigation = useNavigation<ProfilesScreenNavigationProp>();
  const [matches, setMatches] = useState<ChatMatch[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const tw = useTailwind();

  useEffect(() => {
    return onSnapshot(
      query(
        collection(firebaseDb, 'matches'),
        where('usersMatched', 'array-contains', user?.uid!)
      ),
      (snapshot) => {
        setMatches(
          snapshot.docs.map((doc) => ({
            ...(doc.data() as Match),
            id: doc.id
          }))
        );
        setLoading(false);
      }
    );
  }, [user]);
  return (
    <SafeAreaView>
      <ChatHeaderComponent callEnabled={false} title='Chats' route='Profiles' />
      {!loading && <ChatListComponent chats={matches} />}
    </SafeAreaView>
  );
};

export default InterestsScreen;
