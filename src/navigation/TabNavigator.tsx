import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { Localize } from '../localized';
import DummyScreen from '../screens/DummyScreen';
import SwipeScreen from '../screens/main/SwipeScreen';
import SearchScreen from '../screens/main/SearchScreen';

export type TabStackParamList = {
  Search: undefined;
  Swiper: undefined;
  MeineKurse: undefined;
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
        tabBarActiveBackgroundColor: '#008800',
        tabBarInactiveBackgroundColor: '#00AA00',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'MeineKurse':
              return (
                <Entypo
                  name='open-book'
                  size={size}
                  color={focused ? '#630300' : 'white'}
                />
              );
            case 'Search':
              return (
                <FontAwesome
                  name='search'
                  size={size}
                  color={focused ? '#630300' : 'white'}
                />
              );
            case 'Swiper':
              return (
                <MaterialIcons
                  name='explore'
                  size={size}
                  color={focused ? '#630300' : 'white'}
                />
              );
          }
        }
      })}
    >
      <Tabs.Screen
        name='Swiper'
        component={SwipeScreen}
        options={{
          tabBarLabel: Localize('tabSwiperLabel')
        }}
      />
      <Tabs.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarLabel: Localize('tabSearchLabel')
        }}
      />
      <Tabs.Screen
        name='MeineKurse'
        component={DummyScreen}
        options={{
          tabBarLabel: Localize('tabMyStuffLabel')
        }}
      />
    </Tabs.Navigator>
  );
}

export default TabNavigator;
