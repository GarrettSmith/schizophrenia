import appSelector from './selector';

import isObject from '../lib/isObject';
import {
  merge,
  mergeWith,
} from 'ramda';

export default function mapStateToProps(state) {
  // perform 2 levels of merging
  return mergeWith(
    (a, b) => isObject(a) && isObject(b) ? merge(a, b) : b,
    appSelector(state),
    {
      ...state,
      msg: state.intl.messages[state.intl.selectedLanguage],
    }
  );
}
