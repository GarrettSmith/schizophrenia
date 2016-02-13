import {StyleSheet} from 'react-native';
import {COLOR} from 'react-native-material-design';

export const COLORS = {
  BLACK: COLOR.paperGrey800.color,
  BLACK_DARK: '#000',
  DIM: COLOR.paperGrey300.color,
  DIM_DARK: COLOR.paperGrey500.color,
  PRIMARY: COLOR.paperBlue900.color,
  SECONDARY: COLOR.paperPink400.color,
  TERTIARY: COLOR.paperGrey700.color,
  WHITE: '#fff',
};

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centered: {
    textAlign: 'center'
  },
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1
  },
  paragraph: {
    color: COLORS.BLACK,
    fontSize: 16
  },
  sceneView: {
    backgroundColor: COLORS.WHITE,
    flex: 1
  }
});
