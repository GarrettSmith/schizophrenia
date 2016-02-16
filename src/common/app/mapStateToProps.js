import appSelector from './selector';

import isObject from '../lib/isObject';
import {
  merge,
  mergeWith,
} from 'ramda';

const deepMerge = mergeWith(
    (a, b) => isObject(a) && isObject(b) ? deepMerge(a, b) : b,
);

export default function mapStateToProps(state) {
  // perform 2 levels of merging
  return deepMerge(
    appSelector(state),
    {
      ...state,
      msg: state.intl.messages[state.intl.selectedLanguage],
    }
  );
}
