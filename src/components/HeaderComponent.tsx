import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { ChatsScreenNavigationProps } from '../screens/ChatsScreen';
import { Ionicons } from '@expo/vector-icons';

const HeaderComponent = () => {
  const tw = useTailwind();
  const { logout } = useAuth();
  const navigation = useNavigation<ChatsScreenNavigationProps>();

  return (
    <View style={tw('flex-row items-center justify-between w-full pt-4 px-5')}>
      <TouchableOpacity onPress={logout}>
        <Image
          style={tw('h-10 w-10 rounded-full')}
          source={{
            uri: 'https://xsgames.co/randomusers/assets/avatars/male/32.jpg'
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Image
          style={tw('h-14 w-14 rounded-full')}
          source={require('../logo.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
        <Ionicons name='chatbubble-sharp' size={30} color={'#FF5864'} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
