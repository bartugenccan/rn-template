import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { CustomText } from '@/components';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { t } = useTranslation();

  const getIconName = (routeName: string, isFocused: boolean) => {
    // Use original route names instead of translated ones
    switch (routeName) {
      case 'Home':
        return isFocused ? 'home' : 'home-outline';
      case 'Progress':
        return isFocused ? 'pie-chart' : 'pie-chart-outline';
      case 'History':
        return isFocused ? 'document-text-sharp' : 'document-text-outline';
      case 'Profile':
        return isFocused ? 'person' : 'person-outline';
      default:
        return 'help-circle-outline';
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = getIconName(route.name, isFocused);
        // Translate the tab name for display
        const translatedName = t(`tabs.${route.name.toLowerCase()}`);

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.7}>
            <View style={styles.tabContent}>
              <Ionicons name={iconName as any} size={24} color={isFocused ? '#fff' : '#8080C8'} />
              <CustomText style={[styles.tabLabel, { color: isFocused ? '#fff' : '#8080C8' }]}>
                {translatedName?.toLocaleUpperCase()}
              </CustomText>
              {isFocused && <View style={styles.activeDot} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2D10FF',
    height: verticalScale(84),
    paddingBottom: verticalScale(23),
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: scale(12),
    marginTop: verticalScale(4),
  },
  activeDot: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: Colors.secondary,
    marginTop: verticalScale(4),
  },
});

export default CustomTabBar;
