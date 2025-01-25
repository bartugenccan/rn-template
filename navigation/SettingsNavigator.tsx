import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '@/screens';
import { AppRoutes } from '@/types/navigation';

const Stack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.SETTINGS} component={SettingsScreen} />
    </Stack.Navigator>
  );
};
