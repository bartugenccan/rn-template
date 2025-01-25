import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, HomeDetail } from '@/screens';
import { AppRoutes, HomeStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.HOME} component={HomeScreen} />
      <Stack.Screen name={AppRoutes.HOME_DETAIL} component={HomeDetail} />
      {/* Add screens that you want to see tab bar */}
    </Stack.Navigator>
  );
};
