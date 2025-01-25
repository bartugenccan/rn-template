import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { NavigatorScreenParams } from '@react-navigation/native';

// Define the main tab navigator params
export type MainTabParamList = {
  Home: undefined;
  Progress: undefined;
  History: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  SignUp: undefined;
  // Add other auth screen names here
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  NonTabScreen: undefined;
  // Add other modal or stack screen names here
};

// Combined navigation prop type
export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Route prop type for each screen
export type AppRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

// Props type for each screen component
export interface ScreenProps<T extends keyof RootStackParamList> {
  navigation: AppNavigationProp;
  route: AppRouteProp<T>;
}
