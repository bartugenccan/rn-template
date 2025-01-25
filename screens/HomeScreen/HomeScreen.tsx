import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { AppRoutes } from '@/types/navigation/routes';
import { useAppNavigation } from '@/hooks';
import { CustomText } from '@/components';
import { verticalScale } from 'react-native-size-matters';

const HomeScreen = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(AppRoutes.NON_TAB_SCREEN)}
          style={styles.button}>
          <CustomText
            i18nKey="home.navigateToNonTabScreen"
            fontFamily="regular"
            style={styles.buttonText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(AppRoutes.MODAL_SCREEN)}
          style={styles.button}>
          <CustomText
            i18nKey="home.navigateToModalScreen"
            fontFamily="regular"
            style={styles.buttonText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(AppRoutes.HOME_DETAIL)}
          style={styles.button}>
          <CustomText
            i18nKey="home.navigateToHomeDetail"
            fontFamily="regular"
            style={styles.buttonText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    rowGap: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
  },
});

export default HomeScreen;
