import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { Ionicons, Foundation } from '@expo/vector-icons';
import {
  useNavigation,
  CompositeNavigationProp
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigation/TabNavigator';

interface Props {
  title: string;
  callEnabled: boolean;
  route: 'Chats' | 'Profiles';
  image?: string;
}

const ChatHeaderComponent: React.FC<Props> = ({
  title,
  callEnabled,
  route,
  image
}) => {
  const tw = useTailwind();
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<TabStackParamList, 'Chats'>,
        BottomTabNavigationProp<TabStackParamList, 'Profiles'>
      >
    >();

  return (
    <View style={tw('p-2 flex-row items-center justify-between ')}>
      <View style={tw('flex flex-row items-center')}>
        <TouchableOpacity
          onPress={() => navigation.navigate(route)}
          style={tw('p-2')}
        >
          <Ionicons name='chevron-back-outline' size={34} color='#FF5864' />
        </TouchableOpacity>
        <Text style={tw('text-lg font-bold pl-2')}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity style={tw('rounded-full mr-4 overflow-hidden')}>
          {image && (
            <Image
              source={{ uri: image }}
              style={tw('h-10 w-10')}
              resizeMode='cover'
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatHeaderComponent;
