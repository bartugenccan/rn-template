import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, SettingsScreen, ProfileScreen, NonTabScreen } from '../screens';
import { RootStackParamList, MainTabParamList } from '../types/navigation';
import { CustomTabBar } from '../components';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Define non-tab screens
const nonTabScreens = [
  { name: 'NonTabScreen', component: NonTabScreen },
  // Add other non-tab screens here
];

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      {nonTabScreens.map(({ name, component }) => (
        <Stack.Screen
          key={name}
          name={name as keyof RootStackParamList}
          component={component}
          options={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
};
