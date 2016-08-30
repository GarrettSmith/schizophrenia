import {createAction} from 'redux-actions';

export const SET_NOTIFICATION_TIME = 'SET_NOTIFICATION_TIME';
export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';

export const actions = {
  setNotificationTime: createAction(SET_NOTIFICATION_TIME),
  toggleNotification: createAction(TOGGLE_NOTIFICATION),
};
