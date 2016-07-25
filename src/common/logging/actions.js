import {createAction} from 'redux-actions';

export const SAVE_ENTRY = 'SAVE_ENTRY';
export const RESET_ENTRY = 'RESET_ENTRY';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';
export const EDIT_ENTRY = 'EDIT_ENTRY';

function saveEntry() {
  return ({getUid, now}) => ({
    type: SAVE_ENTRY,
    payload: {
      createdAt: now(),
      id: getUid(),
    },
  });
}

export const logging = {
  resetEntry: createAction(RESET_ENTRY),
  saveEntry,
  updateEntry: createAction(UPDATE_ENTRY),
  editEntry: createAction(EDIT_ENTRY),
};
