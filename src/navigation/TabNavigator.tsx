import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import InterestsScreen from '../screens/InterestsScreen';
import SwipeScreen from '../screens/SwipeScreen';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import EditProfileScreen from '../screens/EditProfileScreen';
import useAuth from '../hooks/useAuth';

export type TabStackParamList = {
  Interests: undefined;
  Swiper: undefined;
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
      initialRouteName='Swiper'
      screenOptions={({ route }) => ({
        tabBarStyle: { borderTopWidth: 0 },
        headerShown: false,
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#630300',
        tabBarActiveBackgroundColor: '#FF5864',
        tabBarInactiveBackgroundColor: '#FF5864',
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Interests':
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
            case 'Swiper':
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
      <Tabs.Screen name='Home' component={EditProfileScreen} options={{
          tabBarLabel: 'Home'
      }}/>
      <Tabs.Screen name='Swiper' component={SwipeScreen} options={{
          tabBarLabel: 'Swipe around'
      }}/>
      <Tabs.Screen name='Interests' component={InterestsScreen} options={{
          tabBarLabel: 'Interests'
      }}/>
    </Tabs.Navigator>
  );
}

export default TabNavigator;
