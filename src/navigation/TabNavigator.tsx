import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import ChatsScreen from '../screens/ChatsScreen';
import ProfilesScreen from '../screens/ProfilesScreen';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import EditProfileScreen from '../screens/EditProfileScreen';
import useAuth from '../hooks/useAuth';

export type TabStackParamList = {
  Chats: undefined;
  Profiles: undefined;
  Home: undefined;
};

const Tabs = createBottomTabNavigator<TabStackParamList>();

function TabNavigator(): JSX.Element {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <Tabs.Navigator
      initialRouteName='Profiles'
      screenOptions={({ route }) => ({
        tabBarStyle: { borderTopWidth: 0 },
        headerShown: false,
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#630300',
        tabBarActiveBackgroundColor: '#FF5864',
        tabBarInactiveBackgroundColor: '#FF5864',
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Chats':
              return (
                <Entypo
                  name='chat'
                  size={size}
                  color={focused ? '#630300' : 'white'}
                />
              );
            case 'Home':
              return (
                <Entypo
                  name='home'
                  size={size}
                  color={focused ? '#630300' : 'white'}
                />
              );
            case 'Profiles':
              return (
                <FontAwesome
                  name='user'
                  size={size}
                  color={focused ? '#630300' : 'white'}
                />
              );
          }
        }
      })}
    >
      <Tabs.Screen name='Chats' component={ChatsScreen} />
    </Tabs.Navigator>
  );
}

export default TabNavigator;
