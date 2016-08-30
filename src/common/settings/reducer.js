import * as actions from './actions';

const initialState = {
  notificationEnabled: true,
  notificationTime: 18,
};

import {
  assoc,
} from 'ramda';

function setNotificationTime(time, state) {
  const filtered = parseInt(time) % 24;
  return assoc('notificationTime', filtered, state);
}

function toggleNotification(enabled, state) {
  return assoc('notificationEnabled', !!enabled, state);
}

export default function settingsReducer(state = initialState, action) {
  switch(action.type) {
    case actions.SET_NOTIFICATION_TIME:
      return setNotificationTime(action.payload, state);

    case actions.TOGGLE_NOTIFICATION:
      return toggleNotification(action.payload, state);
  }
  return state;
}
