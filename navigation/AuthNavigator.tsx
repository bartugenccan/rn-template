import { SignUp } from '@/screens/SignUp';
import { AppRoutes, AuthStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';

const Auth = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Auth.Navigator screenOptions={{ headerShown: false }}>
    <Auth.Screen name={AppRoutes.SIGN_UP} component={SignUp} />
  </Auth.Navigator>
);
