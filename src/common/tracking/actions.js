import {createAction} from 'redux-actions';
import {TIME_INTERVAL_DIRECTIONS} from './constants';

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
  nextTimeInterval:
    createAction(CHANGE_TIME_INTERVAL, () => TIME_INTERVAL_DIRECTIONS.NEXT),
  previousTimeInterval:
    createAction(CHANGE_TIME_INTERVAL, () => TIME_INTERVAL_DIRECTIONS.PREVIOUS),
  toggleDimension,
};
