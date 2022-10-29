import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { TailwindProvider } from 'tailwind-rn/dist';
import { AuthProvider } from './src/hooks/useAuth';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {

  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    // <TailwindProvider utilities={utilities}>
    <TailwindProvider>
      <NavigationContainer>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </NavigationContainer>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
