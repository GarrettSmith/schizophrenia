import * as actions from './actions';
import {JournalEntry} from './models';

const initialState = {
  entries: {},
  newContent: '',
};

import {
  assoc,
  evolve,
  mergeAll,
} from 'ramda';

import {
  set,
} from '../lib/state';

function saveJournalEntry(entry, state) {
  const newEntry = mergeAll([
    JournalEntry,
    entry,
    {
      content: state.newContent,
    }
  ]);
  return evolve(
    {
      entries: set(newEntry),
      newContent: () => '',
    },
    state
  );
}

function updateJournalContent(content, state) {
  return assoc('newContent', content, state);
}

export default function journalReducer(state = initialState, action) {
  switch(action.type) {
    case actions.SAVE_JOURNAL_ENTRY:
      return saveJournalEntry(action.payload, state);

    case actions.UPDATE_JOURNAL_CONTENT:
      return updateJournalContent(action.payload, state);
  }
  return state;
}
