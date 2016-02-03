export const ON_DRAWER_CHANGE = 'ON_DRAWER_CHANGE';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const SET_DRAWER_ENABLED = 'SET_DRAWER_ENABLED';

function onDrawerChange(isOpen) {
  return {
    type: ON_DRAWER_CHANGE,
    payload: {isOpen},
  };
}

function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

function setDrawerEnabled(enabled) {
  return {
    type: SET_DRAWER_ENABLED,
    payload: {enabled},
  };
}

export const ui = {
  onDrawerChange,
  toggleDrawer,
  setDrawerEnabled,
};
