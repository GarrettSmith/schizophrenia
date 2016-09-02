import {createAction} from 'redux-actions';

export const SAVE_JOURNAL_ENTRY = 'SAVE_JOURNAL_ENTRY';
export const UPDATE_JOURNAL_CONTENT = 'UPDATE_JOURNAL_CONTENT';

function saveJournalEntry(id) {
  return ({getUid, now}) => ({
    type: SAVE_JOURNAL_ENTRY,
    payload: {
      createdAt: now(),
      id: id || getUid(),
    },
  });
}

export const actions = {
  saveJournalEntry,
  updateJournalContent: createAction(UPDATE_JOURNAL_CONTENT),
};
