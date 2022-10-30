import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Linking
} from 'react-native';
import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import useAuth from '../hooks/useAuth';
import { Localize } from '../localized';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const RegisterScreen = () => {
  const tw = useTailwind();
  const { register } = useAuth();
  const [email, setEmail] = useState('bob@ross.com');
  const [pwd, setPwd] = useState('Test_123');
  const [pwdConf, setPwdConf] = useState('Test_123');
  const [anrede, setAnrede] = useState('Herr');
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('Bob');
  const [lastName, setLastName] = useState('Ross');
  const [agb, setAgb] = useState(false);
  const [birthdate, setBirthdate] = useState('2022-12-12');
  const formIncomplete = !(
    email &&
    pwd &&
    pwdConf &&
    pwd === pwdConf &&
    anrede &&
    firstName &&
    lastName &&
    birthdate &&
    agb
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={tw('flex-1')}>
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
              'p-5 rounded-lg flex flex-col bg-black/60 items-center justify-center m-12 py-16 pl-14'
            ),
            Platform.OS === 'web' ? tw('w-3/5') : tw('w-3/4')
          ]}
        >
          {/* Email */}
          <View style={tw('items-start w-full mb-5')}>
            <Text style={tw('text-white font-bold text-xl mb-3')}>
              {Localize('loginScreenEmailLabel')}
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={Localize('email-address')}
              keyboardType='email-address'
              style={tw('bg-gray-50 w-11/12 rounded px-3 py-2')}
            />
          </View>
          {/* Anrede / Title */}
          <View style={tw('w-full mb-5 flex-row justify-between pr-10')}>
            {/* Anrede */}
            <View style={tw('items-start w-1/3 pr-5')}>
              <Text style={tw('text-white font-bold text-xl mb-3')}>
                {Localize('registerScreenAnredeLabel')}
              </Text>
              <TextInput
                value={anrede}
                onChangeText={setAnrede}
                placeholder={Localize('registerScreenAnredeLabel')}
                style={tw('bg-gray-50  rounded px-3 py-2')}
              />
            </View>
            {/* Title */}
            <View style={tw('items-start w-1/3')}>
              <Text style={tw('text-white font-bold text-xl mb-3')}>
                {Localize('registerScreenTitleLabel')}
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder={Localize('registerScreenTitleLabel')}
                style={tw('bg-gray-50 rounded px-3 py-2')}
              />
            </View>
          </View>
          {/* First / Last Name */}
          <View style={tw('w-full mb-5 flex-row justify-between pr-10')}>
            {/* First Name */}
            <View style={tw('items-start')}>
              <Text style={tw('text-white font-bold text-xl mb-3')}>
                {Localize('registerScreenFirstNameLabel')}
              </Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder={Localize('registerScreenFirstNameLabel')}
                style={tw('bg-gray-50  rounded px-3 py-2')}
              />
            </View>
            {/* Last Name */}
            <View style={tw('items-start')}>
              <Text style={tw('text-white font-bold text-xl mb-3')}>
                {Localize('registerScreenLastNameLabel')}
              </Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder={Localize('registerScreenLastNameLabel')}
                style={tw('bg-gray-50 rounded px-3 py-2')}
              />
            </View>
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
              style={[
                tw('bg-gray-50 w-11/12 rounded px-3 py-2'),
                tw(pwd !== pwdConf ? 'border-4 border-red-600' : '')
              ]}
            />
          </View>
          <View style={tw('items-start w-full mb-5')}>
            <Text style={tw('text-white font-bold text-xl mb-3')}>
              {Localize('registerScreenConfirmPasswordLabel')}
            </Text>
            <TextInput
              value={pwdConf}
              onChangeText={setPwdConf}
              secureTextEntry
              placeholder={Localize('registerScreenConfirmPasswordLabel')}
              style={[
                tw('bg-gray-50 w-11/12 rounded px-3 py-2'),
                tw(pwd !== pwdConf ? 'border-4 border-red-600' : '')
              ]}
            />
          </View>
          <View style={tw('items-start w-full mb-5')}>
            <Text style={tw('text-white font-bold text-xl mb-3')}>
              {Localize('registerScreenBirthdayLabel')}
            </Text>
            <TextInput
              value={birthdate}
              onChangeText={setBirthdate}
              placeholder={Localize('registerScreenBirthdayLabel')}
              style={[
                tw('bg-gray-50 w-11/12 rounded px-3 py-2'),
                tw(pwd !== pwdConf ? 'border-4 border-red-600' : '')
              ]}
            />
          </View>
          {/* AGB */}
          <View style={tw('flex-row items-start')}>
            <BouncyCheckbox
              onPress={setAgb}
              isChecked={agb}
              fillColor='green'
            />
            <TouchableWithoutFeedback
              onPress={() => {
                Linking.canOpenURL(
                  'https://www.vhs-fulda.de/wp-content/uploads/2021/01/AGB-vhs-Landkreis-Fulda.pdf'
                ).then((supported) => {
                  if (supported) {
                    Linking.openURL(
                      'https://www.vhs-fulda.de/wp-content/uploads/2021/01/AGB-vhs-Landkreis-Fulda.pdf'
                    );
                  }
                });
              }}
            >
              <Text style={[tw('text-green-600'), { cursor: 'pointer' }]}>
                {Localize('registerScreenAgbMessageLabel')}
              </Text>
            </TouchableWithoutFeedback>
          </View>

          <TouchableOpacity
            style={[
              tw('bg-black/60 rounded-2xl mr-2 m-5'),
              formIncomplete && tw('bg-gray-600')
            ]}
            disabled={formIncomplete}
            onPress={() => {
              register(email, pwd);
            }}
          >
            <Text style={tw('text-white font-semibold p-4')}>
              {Localize('registerScreenRegisterBtn')}
            </Text>
          </TouchableOpacity>
          <Text style={tw('text-white')}>
            {Localize('registerScreenAlreadyRegisteredLabel')}{' '}
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <Text style={[tw('text-green-600'), { cursor: 'pointer' }]}>
                {Localize('registerScreenAlreadyRegisteredLinkLabel')}
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default RegisterScreen;
