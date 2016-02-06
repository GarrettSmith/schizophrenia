import {createAction} from 'redux-actions';

export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const ON_DRAWER_CHANGE = 'ON_DRAWER_CHANGE';
export const OPEN_DRAWER = 'OPEN_DRAWER';
export const SET_DRAWER_ENABLED = 'SET_DRAWER_ENABLED';

export const ui = {
  closeDrawer: createAction(CLOSE_DRAWER),
  openDrawer: createAction(OPEN_DRAWER),
  onDrawerChange: createAction(ON_DRAWER_CHANGE),
  setDrawerEnabled: createAction(SET_DRAWER_ENABLED),
};
