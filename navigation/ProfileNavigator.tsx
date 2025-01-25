import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '@/screens';
import { AppRoutes } from '@/types/navigation';

const Stack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
};
