import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { AppRoutes } from '@/types/navigation/routes';
import { useAppNavigation } from '@/hooks';
import { CustomText } from '@/components';
import { verticalScale } from 'react-native-size-matters';

export const HomeScreen = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText fontFamily="bold" style={styles.title}>
          Virtual Try-On
        </CustomText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(AppRoutes.CAMERA)}
          style={[styles.button, styles.primaryButton]}>
          <CustomText fontFamily="bold" style={styles.primaryButtonText}>
            Capture Clothing Item
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(AppRoutes.GALLERY)}
          style={[styles.button, styles.secondaryButton]}>
          <CustomText fontFamily="regular" style={styles.secondaryButtonText}>
            View My Wardrobe
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: verticalScale(60),
    paddingHorizontal: 20,
    paddingBottom: verticalScale(40),
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#000',
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
    rowGap: verticalScale(20),
    justifyContent: 'center',
  },
  button: {
    paddingVertical: verticalScale(18),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 16,
  },
});
