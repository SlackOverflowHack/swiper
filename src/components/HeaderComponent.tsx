import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Localize } from '../localized';

const HeaderComponent = () => {
  const tw = useTailwind();
  const { logout } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={tw('flex-row items-center justify-between w-full pt-4 px-5')}>
      <TouchableOpacity
        onPress={logout}
        style={tw('px-2 py-1 rounded-lg border-2 border-red-600')}
      >
        <Text style={tw('text-red-600 font-bold')}>
          {Localize('mainLogoutLabel')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
