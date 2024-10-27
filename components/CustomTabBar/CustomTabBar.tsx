import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { styles } from './CustomTabBar.styles';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={[styles.container]}>
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

        let iconName;
        if (route.name === 'Home') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = isFocused ? 'person' : 'person-outline';
        } else if (route.name === 'Settings') {
          iconName = isFocused ? 'settings' : 'settings-outline';
        }

        return (
          <TouchableOpacity key={index} onPress={onPress} style={styles.tabButton}>
            <Ionicons
              name={iconName as any}
              size={30}
              color={isFocused ? Colors.primary : Colors.primary}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
