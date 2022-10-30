import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../hooks/useAuth';
import { Localize } from '../localized';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

const LoginScreen = () => {
  const tw = useTailwind();
  const { login } = useAuth();
  const [email, setEmail] = useState('bob@ross.com');
  const [pwd, setPwd] = useState('Test_123');
  const formIncomplete = !(email && pwd);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={tw('flex-1')}>
      <ImageBackground
        resizeMode='cover'
        source={
          Platform.OS === 'web'
            ? require('../../assets/login_bg_web.png')
            : require('../../assets/login_bg.png')
        }
        style={tw('flex-1 flex flex-col items-center justify-center h-full')}
      >
        <View
          style={[
            tw(
              'p-5 rounded-lg flex flex-col bg-black/60 items-center justify-center m-12 py-16'
            ),
            Platform.OS === 'web' ? tw('w-1/2') : tw('w-3/4')
          ]}
        >
          <View style={tw('items-start w-full mb-5')}>
            <Text style={tw('text-white font-bold text-xl mb-3')}>
              {Localize('loginScreenEmailLabel')}
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={Localize('email-address')}
              keyboardType='email-address'
              style={tw('bg-gray-50 w-full rounded px-3 py-2')}
            />
          </View>
          <View style={tw('items-start w-full mb-5')}>
            <Text style={tw('text-white font-bold text-xl mb-3')}>
              {Localize('loginScreenPasswordLabel')}
            </Text>
            <TextInput
              value={pwd}
              onChangeText={setPwd}
              secureTextEntry
              placeholder={Localize('loginScreenPasswordLabel')}
              style={tw('bg-gray-50 w-full rounded px-3 py-2')}
            />
          </View>
          <TouchableOpacity
            style={tw('bg-black/60 rounded-2xl mr-2 m-5')}
            disabled={formIncomplete}
            onPress={() => {
              login(email, pwd);
            }}
          >
            <Text style={tw('text-white font-semibold p-4')}>
              {Localize('loginScreenLoginBtn')}
            </Text>
          </TouchableOpacity>
          <Text style={tw('text-white')}>
            {Localize('loginScreenNotRegisteredLabel')}{' '}
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Register');
              }}
            >
              <Text style={[tw('text-green-600'), { cursor: 'pointer' }]}>
                {Localize('loginScreenNotRegisteredLinkLabel')}
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
