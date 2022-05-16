import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  gradientHeader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  appBarThreeItemBackground: {
    backgroundColor: '#00131A',
    borderBottomWidth: 1,
    borderBottomColor: '#003143',
  },
  appBarThreeItem: {
    backgroundColor: Colors.darkBlue,
    borderBottomWidth: 1,
    borderBottomColor: '#003143',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appBarThreeItemText: { flex: 0.9, textAlign: 'center', color: 'white' },
  appBarThreeItemButton: {
    width: 100,
    backgroundColor: 'transparent',
  },
  appBarThreeItemButtonText: {
    alignSelf: 'center',
    fontFamily: 'TransatStandard',
    fontSize: 16,
    color: '#00ADEF',
  },
  appBarWidthThreeIcons: { width: '100%' },
  appBarThreeIconsSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appBarThreeIconContent: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginRight: 18,
  },
});

export default styles;
