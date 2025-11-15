import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, HomeDetail, CameraScreen, GalleryScreen } from '@/screens';
import { AppRoutes, HomeStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.HOME} component={HomeScreen} />
      <Stack.Screen name={AppRoutes.HOME_DETAIL} component={HomeDetail} />
      <Stack.Screen name={AppRoutes.CAMERA} component={CameraScreen} />
      <Stack.Screen name={AppRoutes.GALLERY} component={GalleryScreen} />
    </Stack.Navigator>
  );
};
