import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { AppRoutes, RootStackParamList } from '@/types/navigation';
import { useMemo, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';

// Enable native screens optimization
enableScreens();

const RootStack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const [isAuthenticated, _setIsAuthenticated] = useState<boolean>(true);

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      cardStyleInterpolator: Platform.select({
        ios: CardStyleInterpolators.forHorizontalIOS,
        android: CardStyleInterpolators.forFadeFromBottomAndroid,
      }),
      detachInactiveScreens: true,
      freezeOnBlur: true,
      lazy: true,
      unmountOnBlur: true,
    }),
    []
  );

  const renderScreens = useCallback(() => {
    if (isAuthenticated) {
      return <RootStack.Screen name={AppRoutes.MAIN} component={MainNavigator} />;
    }
    return <RootStack.Screen name={AppRoutes.AUTH} component={AuthNavigator} />;
  }, [isAuthenticated]);

  return <RootStack.Navigator screenOptions={screenOptions}>{renderScreens()}</RootStack.Navigator>;
};
