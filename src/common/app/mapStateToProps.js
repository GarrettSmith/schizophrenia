import appSelector from './selector';

import isObject from '../lib/isObject';
import {mergeWith} from 'ramda';

const deepMerge = mergeWith(
    (a, b) => isObject(a) && isObject(b) ? deepMerge(a, b) : b,
);

export default function mapStateToProps(state) {
  return deepMerge(
    appSelector(state),
    state
  );
}
