import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabStackParamList } from '../navigation/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { generateId } from '../lib/generateId';

const MatchScreen = () => {
  const tw = useTailwind();
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        NativeStackNavigationProp<RootStackParamList, 'Chat'>,
        BottomTabNavigationProp<TabStackParamList, 'Profiles'>
      >
    >();
  const {
    params: { userProfile, matchedProfile }
  } = useRoute<RouteProp<RootStackParamList, 'Match'>>();
  return (
    <SafeAreaView
      style={[
        tw('h-full w-full bg-red-600 pt-20'),
        {
          opacity: 0.89
        }
      ]}
    >
      <View style={tw('justify-center px-10 pt-20')}>
        <Image
          style={tw('w-full h-20')}
          resizeMode='contain'
          source={{
            uri: 'https://e9digital.com/love-at-first-website/images/its-a-match.png'
          }}
        />
        <View>
          <Text style={tw('text-white text-center mt-5')}>
            You and {matchedProfile.displayName} have liked each other.
          </Text>
        </View>
        <View style={tw('flex-row w-full items-center justify-evenly mt-5')}>
          <Image
            style={tw('w-32 h-32 rounded-full')}
            source={{
              uri: userProfile.photoUrl
            }}
          />
          <Image
            style={tw('w-32 h-32 rounded-full')}
            source={{
              uri: matchedProfile.photoUrl
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            navigation.navigate('Chats');
            navigation.navigate('Chat', {
              id: generateId(userProfile.id, matchedProfile.id),
              users: {
                [userProfile.id]: userProfile,
                [matchedProfile.id]: matchedProfile
              },
              usersMatched: [userProfile.id, matchedProfile.id]
            });
          }}
          style={tw(
            'bg-white m-5 px-8 py-6 rounded-full mt-20 text-center font-bold text-xl'
          )}
        >
          <Text style={tw('text-center')}>Send a Message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MatchScreen;
