import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../hooks/useAuth';
import { Localize } from '../localized';


const LoginScreen = () => {
  const tw = useTailwind();
  const { login, register } = useAuth();
  const [email, setEmail] = useState('bob@ross.com');
  const [pwd, setPwd] = useState('Test_123');
  const formIncomplete = !(email && pwd);

  return (
    <View style={tw('flex-1')}>
      <ImageBackground
        resizeMode='cover'
        source={{ uri: 'https://tinder.com/static/tinder.png' }}
        style={tw('flex-1 flex flex-col items-center justify-center pb-[25%]')}
      >
        {/* <Image
          style={tw('h-20 w-full z-50')}
          resizeMode='contain'
          source={require('../profile_logo.png')}
        /> */}
        <View
          style={tw('rounded-lg bg-black/30 px-5 py-3 items-start w-3/4 mb-5')}
        >
          <Text style={tw('text-white font-bold text-xl mb-3')}>{Localize('email')}</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder={Localize('email-address')}
            keyboardType='email-address'
            style={tw('bg-gray-50 w-full rounded px-3 py-2')}
          />
        </View>
        <View
          style={tw('rounded-lg bg-black/30 px-5 py-3 items-start w-3/4 mb-5')}
        >
          <Text style={tw('text-white font-bold text-xl mb-3')}>{Localize('password')}</Text>
          <TextInput
            value={pwd}
            onChangeText={setPwd}
            secureTextEntry
            placeholder={Localize('password')}
            style={tw('bg-gray-50 w-full rounded px-3 py-2')}
          />
        </View>
        <TouchableOpacity
          style={tw('bg-black/60 rounded-2xl mb-5')}
          disabled={formIncomplete}
          onPress={() => {
            login(email, pwd);
          }}
        >
          <Text style={tw(' text-white font-semibold p-4')}>
            {Localize('signin-swipin')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw('bg-black/60 rounded-2xl')}
          onPress={() => register(email, pwd)}
          disabled={formIncomplete}
        >
          <Text style={tw('text-white font-semibold p-4')}>{Localize('register')}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
