import { SignUp } from '@/screens/SignUp';
import { AuthStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';

const Auth = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Auth.Navigator screenOptions={{ headerShown: false }}>
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);
