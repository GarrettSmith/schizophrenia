import * as actions from './actions';

import * as routes from '../lib/routes';
import {
  assoc,
  findLast,
  is,
  map,
  merge,
  pick,
  pickBy,
  propEq,
} from 'ramda';

const initialState = {
  currentPath: null,
  currentRoute: null,
  drawerEnabled: true,
  drawerOpen: false,
  primaryRoute: {
    name: 'logAgenda',
  },
};

export default function uiReducer(state = initialState, action) {

  switch (action.type) {

    case actions.CLOSE_DRAWER: {
      return assoc('drawerOpen', false, state);
    }

    case actions.OPEN_DRAWER: {
      return assoc('drawerOpen', true, state);
    }

    case actions.ON_DRAWER_CHANGE: {
      return assoc('drawerOpen', action.payload, state);
    }

    case actions.SET_DRAWER_ENABLED: {
      return assoc('drawerEnabled', action.payload, state);
    }

    case actions.SET_ROUTE: {
      return assoc('currentRoute', action.payload, state);
    }

  }

  return state;
}
