import * as actions from './actions';

// This isn't really common across platforms
import {Actions} from 'react-native-router-flux';

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

// pick a subset able to be passed around
function pickRoute(route) {
  const top = pick(
    [
      'name',
      'title',
      'type',
    ],
    route
  );
  const props = pickBy(
    p => is(String, p) || is(Function, p),
    route.props
  );
  return assoc('props', props, top);
};

function setCurrentRoute(base, state) {
  const currentRoute = routes.current(base);
  const route = pickRoute(currentRoute);
  const path = map(pickRoute, routes.path(currentRoute));
  const primary = findLast(propEq('type', 'replace'), path);
  return merge(
    state,
    {
      currentRoute: route,
      currentPath: path,
      primaryRoute: primary || state.primaryRoute,
    }
  );
}

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

    // Routing Actions
    case Actions.AFTER_ROUTE:
    case Actions.AFTER_POP: {
      return setCurrentRoute(action.route, state);
    }

    case actions.SET_ROUTE: {
      return setCurrentRoute(action.payload, state);
    }

  }

  return state;
}
