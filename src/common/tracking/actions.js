import {createAction} from 'redux-actions';

export const SET_TIME_SCALE = 'SET_TIME_SCALE';
export const CHANGE_TIME_INTERVAL = 'CHANGE_TIME_INTERVAL';
export const TOGGLE_DIMENSION = 'TOGGLE_DIMENSION';

function toggleDimension(id, enable) {
  return {
    type: TOGGLE_DIMENSION,
    payload: {
      id,
      enable,
    },
  };
}

export const tracking = {
  setTimeScale: createAction(SET_TIME_SCALE),
  changeTimeInterval: createAction(CHANGE_TIME_INTERVAL),
  toggleDimension,
};
