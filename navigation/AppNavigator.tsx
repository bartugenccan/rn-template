import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { AppRoutes, RootStackParamList } from '@/types/navigation';
import { useMemo, useState } from 'react';
import { ModalScreen, NonTabScreen } from '@/screens';
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

  const modalScreenOptions = useMemo(
    () => ({
      presentation: 'modal' as const,
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    }),
    []
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isAuthenticated ? (
        <>
          <Stack.Group>
            <Stack.Screen
              name={AppRoutes.MAIN}
              component={TabNavigator}
              options={{
                freezeOnBlur: false,
              }}
            />
            <Stack.Screen name={AppRoutes.NON_TAB_SCREEN} component={NonTabScreen} />
            {/* Add screens that you dont want to see tab bar */}
          </Stack.Group>

          <Stack.Group screenOptions={modalScreenOptions}>
            <Stack.Screen name={AppRoutes.MODAL_SCREEN} component={ModalScreen} />
            {/* Add screens that you want to see as a modal */}
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name={AppRoutes.AUTH} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
