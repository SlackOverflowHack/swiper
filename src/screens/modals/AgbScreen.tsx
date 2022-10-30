import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

const AgbScreen = () => {
  const tw = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView>
      <View style={tw('flex-row w-full justify-between p-5')}>
        <View />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Entypo name='circle-with-cross' color='green' size={32} />
        </TouchableOpacity>
      </View>
      <ScrollView style={tw('px-5')}>
        <Text>AGB Text goes here</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AgbScreen;
