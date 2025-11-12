import 'react-native-gesture-handler';

import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigation/AppNavigator';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// i18n
import './i18n';

SplashScreen.preventAutoHideAsync().catch(() => null);

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'YuseiMagic-Regular': require('./assets/fonts/YuseiMagic-Regular.ttf'),
  });

  useEffect(() => {
    if (fontError) {
      throw fontError;
    }
  }, [fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
