import {createAction} from 'redux-actions';

export const SAVE_ENTRY = 'SAVE_ENTRY';
export const RESET_ENTRY = 'RESET_ENTRY';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';
export const EDIT_ENTRY = 'EDIT_ENTRY';
export const SET_CRISIS_RESOLVED = 'SET_CRISIS_RESOLVED';

function saveEntry(id) {
  return ({getUid, now}) => ({
    type: SAVE_ENTRY,
    payload: {
      createdAt: now(),
      id: id || getUid(),
    },
  });
}

function setCrisisResolved(id, resolved) {
  return {
    type: SET_CRISIS_RESOLVED,
    payload: {
      id,
      resolved,
    },
  };
}

export const logging = {
  resetEntry: createAction(RESET_ENTRY),
  saveEntry,
  updateEntry: createAction(UPDATE_ENTRY),
  editEntry: createAction(EDIT_ENTRY),
  setCrisisResolved,
};
