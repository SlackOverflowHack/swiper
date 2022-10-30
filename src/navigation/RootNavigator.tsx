import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import useAuth from '../hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import { useTailwind } from 'tailwind-rn/dist';
import RegisterScreen from '../screens/RegisterScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/modals/SettingsScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;

  Main: undefined;

  KursDetails: { course: Kurs };

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
            <RootStack.Screen name='Settings' component={SettingsScreen} />
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
