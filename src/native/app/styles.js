import {StyleSheet} from 'react-native';
import {COLOR} from 'react-native-material-design';

export const COLORS = {
  BLACK: COLOR.paperGrey800.color,
  DIM: COLOR.paperGrey300.color,
  DIM_DARK: COLOR.paperGrey500.color,
  PRIMARY: COLOR.paperBlue900.color,
  SECONDARY: COLOR.paperPink300.color,
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
    backgroundColor: '#fff',
    flex: 1
  },
  paragraph: {
    color: '#7C7C7C',
    fontSize: 16
  },
  sceneView: {
    backgroundColor: '#fff',
    flex: 1
  }
});
