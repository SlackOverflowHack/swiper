import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn/dist';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const tw = useTailwind();
  return (
    <View>
      <TouchableOpacity
        style={tw('p-5 bg-green-600')}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>DetailsScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsScreen;
