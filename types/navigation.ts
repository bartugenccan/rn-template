import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

// Define the main tab navigator params
export type MainTabParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  // Add other tab screen names here
};

// Define the root stack navigator params
export type RootStackParamList = {
  MainTabs: undefined;
  NonTabScreen: undefined;
  // Add other modal or stack screen names here
};

// Combined navigation prop type
export type AppNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

// Route prop type for each screen
export type AppRouteProp<T extends keyof MainTabParamList | keyof RootStackParamList> = RouteProp<
  MainTabParamList & RootStackParamList,
  T
>;

// Props type for each screen component
export interface ScreenProps<T extends keyof MainTabParamList | keyof RootStackParamList> {
  navigation: AppNavigationProp;
  route: AppRouteProp<T>;
}
