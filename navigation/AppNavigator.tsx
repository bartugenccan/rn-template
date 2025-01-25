import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { NonTabScreen } from '@/screens';
import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';

// Enable native screens optimization
enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  // Move this to a global state
  const [isAuthenticated, _setIsAuthenticated] = useState<boolean>(true);

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      cardStyleInterpolator: Platform.select({
        ios: CardStyleInterpolators.forHorizontalIOS,
        android: CardStyleInterpolators.forFadeFromBottomAndroid,
      }),
      freezeOnBlur: true,
      lazy: true,
    }),
    []
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{
              freezeOnBlur: false,
            }}
          />
          <Stack.Group
            screenOptions={{
              presentation: 'modal',
            }}>
            <Stack.Screen name="NonTabScreen" component={NonTabScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
