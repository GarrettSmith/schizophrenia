import * as actions from './actions';

import {
  Entry,
} from './models';

import {
  assoc,
  evolve,
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
  // only set id and createdAt if new
  const newEntry =
    state.newEntry.id ? state.newEntry : merge(state.newEntry, payload);
  return merge(
    resetEntry(state),
    {
      entries: set(newEntry, state.entries),
    }
  );
}

function resetEntry(state) {
  return merge(state, {newEntry: Entry});
}

function editEntry(id, state) {
  return merge(
    state,
    {
      newEntry: state.entries[id] || state.newEntry,
    }
  );
}

export default function loggingReducer(state = initialState, action) {

  switch (action.type) {

    case actions.UPDATE_ENTRY:
      return updateEntry(action.payload, state);

    case actions.SAVE_ENTRY:
      return saveEntry(action.payload, state);

    case actions.RESET_ENTRY:
      return resetEntry(state);

    case actions.EDIT_ENTRY:
      return editEntry(action.payload, state);
  }

  return state;
}
