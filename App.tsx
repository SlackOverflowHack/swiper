import { NavigationContainer } from '@react-navigation/native';
import { TailwindProvider } from 'tailwind-rn/dist';
import { AuthProvider } from './src/hooks/useAuth';
import RootNavigator from './src/navigation/RootNavigator';
import utilities from './tailwind.json';
import React from 'react';

export default function App() {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </NavigationContainer>
    </TailwindProvider>
  );
}
