import {Actions} from 'react-native-router-flux';

// Find the deepest current route
export function findCurrent(route) {
  if (route.childRouter) {
    return findCurrent(route.childRouter.currentRoute);
  }

  return route;
}

export function current() {
  return findCurrent(Actions.currentRouter.currentRoute);
}
