import * as actions from './actions';

import Entry from './entry';
import Symptom from './symptom';

import {
  lensProp,
  set,
} from 'ramda';

const initialState = {
  entries: {},
};

const entries = lensProp('entries');

export default function todosReducer(state = initialState, action) {

  switch (action.type) {

    case actions.NEW_ENTRY: {
      return state;
    }

    default:
      return state;
  }
}
