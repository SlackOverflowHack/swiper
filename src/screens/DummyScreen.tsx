import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';

const DummyScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation();
  return (
    <View>
      <Text>DummyScreen</Text>
      <TouchableOpacity
        style={tw('bg-black text-white font-bold px-6 py-3')}
        onPress={() => navigation.goBack()}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DummyScreen;
