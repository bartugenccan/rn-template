import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.transparent,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
