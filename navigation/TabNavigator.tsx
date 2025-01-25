import { CustomTabBar } from '@/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigatorParamList } from '@/types/navigation/stacks';
import { TabRoutes } from '@/types/navigation/routes';
import { HomeNavigator } from './HomeNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { SettingsNavigator } from './SettingsNavigator';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name={TabRoutes.HOME} component={HomeNavigator} />
      <Tab.Screen name={TabRoutes.PROFILE} component={ProfileNavigator} />
      <Tab.Screen name={TabRoutes.SETTINGS} component={SettingsNavigator} />
    </Tab.Navigator>
  );
};
