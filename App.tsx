import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './navigation/Navigator';
import { useFonts } from 'expo-font';

// i18n
import './i18n';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'YuseiMagic-Regular': require('./assets/fonts/YuseiMagic-Regular.ttf'),
  });

  /*   React.useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]); */

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <MainNavigator />
    </NavigationContainer>
  );
}
