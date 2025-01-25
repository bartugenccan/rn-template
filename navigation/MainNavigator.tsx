import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { AppRoutes, MainStackParamList } from '@/types/navigation';
import { TabNavigator } from './TabNavigator';
import { ModalScreen, NonTabScreen } from '@/screens';
import { useMemo } from 'react';
import { Platform } from 'react-native';

const MainStack = createStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  const modalScreenOptions = useMemo(
    () => ({
      presentation: 'modal' as const,
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    }),
    []
  );

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      lazy: true,
      cardStyleInterpolator: Platform.select({
        ios: CardStyleInterpolators.forHorizontalIOS,
        android: CardStyleInterpolators.forFadeFromBottomAndroid,
      }),
    }),
    []
  );

  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Group>
        <MainStack.Screen name={AppRoutes.TABS} component={TabNavigator} />
        <MainStack.Screen name={AppRoutes.NON_TAB_SCREEN} component={NonTabScreen} />
      </MainStack.Group>

      <MainStack.Group screenOptions={modalScreenOptions}>
        <MainStack.Screen name={AppRoutes.MODAL_SCREEN} component={ModalScreen} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};
