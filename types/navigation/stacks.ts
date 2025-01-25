import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { AppRoutes, TabRoutes } from './routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Auth Stack
export type AuthStackParamList = {
  [AppRoutes.SIGN_UP]: undefined;
  // Add other auth routes as needed
};

// Tab Stack Param Lists
export type HomeStackParamList = {
  [AppRoutes.HOME]: undefined;
  [AppRoutes.HOME_DETAIL]: undefined; // Example of tab-visible screen in Home
};

export type ProfileStackParamList = {
  [AppRoutes.PROFILE]: undefined;
  [AppRoutes.PROFILE_EDIT]: undefined; // Example of tab-visible screen in Profile
};

export type SettingsStackParamList = {
  [AppRoutes.SETTINGS]: undefined;
  [AppRoutes.SETTINGS_DETAIL]: undefined; // Example of tab-visible screen in Settings
};

// Tab Navigator
export type TabNavigatorParamList = {
  [TabRoutes.HOME]: NavigatorScreenParams<HomeStackParamList>;
  [TabRoutes.PROFILE]: NavigatorScreenParams<ProfileStackParamList>;
  [TabRoutes.SETTINGS]: NavigatorScreenParams<SettingsStackParamList>;
};

// Main Stack (includes both tabs and modal screens)
export type MainStackParamList = {
  [AppRoutes.MAIN]: NavigatorScreenParams<TabNavigatorParamList>;
  [AppRoutes.NON_TAB_SCREEN]: undefined;
  // Add other non-tab screens here
};

// Root Navigator - The top level navigator
export type RootStackParamList = {
  [AppRoutes.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [AppRoutes.MAIN]: NavigatorScreenParams<MainStackParamList>;
  [AppRoutes.NON_TAB_SCREEN]: undefined;
  [AppRoutes.MODAL_SCREEN]: undefined;
};

// Navigation Types
export type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamList &
    MainStackParamList &
    HomeStackParamList &
    ProfileStackParamList &
    SettingsStackParamList
>;
export type AppRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

// Screen Props Helper
export interface ScreenProps<T extends keyof RootStackParamList> {
  navigation: AppNavigationProp;
  route: AppRouteProp<T>;
}
