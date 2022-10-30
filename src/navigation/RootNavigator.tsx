import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import useAuth from '../hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import { useTailwind } from 'tailwind-rn/dist';
import DummyScreen from '../screens/DummyScreen';
import RegisterScreen from '../screens/REgisterScreen';
import DetailsScreen from '../screens/DetailsScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;

  Main: undefined;

  KursDetails: { course: Veranstaltung };

  Settings: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const tw = useTailwind();
  const { user, loading } = useAuth();
  return loading ? (
    <View style={tw('flex-1 items-center justify-center')}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>
  ) : (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        title: 'SportSwiper'
      }}
    >
      {user ? (
        <React.Fragment>
          <RootStack.Group>
            <RootStack.Screen name='Main' component={TabNavigator} />
          </RootStack.Group>
          <RootStack.Group
            screenOptions={{
              presentation: 'modal'
            }}
          >
            <RootStack.Screen name='KursDetails' component={DetailsScreen} />
            <RootStack.Screen name='Settings' component={DummyScreen} />
          </RootStack.Group>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <RootStack.Group>
            <RootStack.Screen name='Login' component={LoginScreen} />
            <RootStack.Screen name='Register' component={RegisterScreen} />
          </RootStack.Group>
        </React.Fragment>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
