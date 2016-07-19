import * as actions from './actions';

import {
  BloodPressure,
  Entry,
} from './models';

import {
  assoc,
  merge,
} from 'ramda';
import {set} from '../lib/state'

const initialState = {
  newEntry: Entry,
  entries: {},
};

function updateEntry(payload, state) {
  return assoc(
    'newEntry',
    merge(state.newEntry, payload),
    state
  );
}

function saveEntry(payload, state) {
  const newEntry = merge(state.newEntry, payload);
  return merge(
    state,
    {
      newEntry: Entry,
      entries: set(newEntry, state.entries),
    }
  );
}

export default function loggingReducer(state = initialState, action) {

  switch (action.type) {

    case actions.UPDATE_ENTRY:
      return updateEntry(action.payload, state);

    case actions.SAVE_ENTRY:
      return saveEntry(action.payload, state);
  }

  return state;
}
