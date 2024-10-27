import React from 'react';
import { Text, TextProps } from 'react-native';
import { useFonts } from 'expo-font';

export const CustomText: React.FC<TextProps> = (props) => {
  const [fontsLoaded] = useFonts({
    'YuseiMagic-Regular': require('../../assets/fonts/YuseiMagic-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or return a loading indicator
  }

  return <Text {...props} style={[{ fontFamily: 'YuseiMagic-Regular' }, props.style]} />;
};
