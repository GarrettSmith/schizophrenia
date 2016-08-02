import * as actions from './actions';

import {
  Entry,
} from './models';

import {
  assoc,
  assocPath,
  evolve,
  merge,
  mergeAll,
} from 'ramda';
import {set} from '../lib/state'
import {detectCrisis} from '../lib/entries';

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
  const exists = !!state.newEntry.id;
  const newEntry = mergeAll([
    state.newEntry,
    // only set id and createdAt if new
    exists ? {} : payload,
    {crisisOccurred: detectCrisis(state.newEntry)},
  ]);
  return evolve(
    {
      entries: set(newEntry),
    },
    resetEntry(state)
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

function setCrisisResolved({id, resolved}, state) {
  return assocPath(
    ['entries', id, 'crisisResolved'],
    resolved,
    state
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

    case actions.SET_CRISIS_RESOLVED:
      return setCrisisResolved(action.payload, state);
  }

  return state;
}
