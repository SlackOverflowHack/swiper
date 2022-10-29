import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import useAuth from '../hooks/useAuth';
import { View } from 'react-native';

export type RootStackParamList = {
  Main: undefined;
  // Chat: ChatMatch;
  Login: undefined;
  EditProfile: undefined;
  // Match: {
  //   userProfile: Profile;
  //   matchedProfile: Profile
  // };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { user, loading } = useAuth();
  return loading ? (
    <View></View>
  ) : (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {user ? (
        <React.Fragment>
          <RootStack.Group>
            <RootStack.Screen name='Main' component={TabNavigator} />
            {/* <RootStack.Screen name='Chat' component={ChatScreen} /> */}
          </RootStack.Group>
          <RootStack.Group
            screenOptions={{
              presentation: 'modal'
            }}
          >
            {/* <RootStack.Screen
              name='EditProfile'
              component={EditProfileScreen}
            /> */}
          </RootStack.Group>
          <RootStack.Group
            screenOptions={{
              presentation: 'transparentModal'
            }}
          >
            {/* <RootStack.Screen name='Match' component={MatchScreen} /> */}
          </RootStack.Group>
        </React.Fragment>
      ) : (
        <RootStack.Group>
          {/* <RootStack.Screen name='Login' component={LoginScreen} /> */}
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
