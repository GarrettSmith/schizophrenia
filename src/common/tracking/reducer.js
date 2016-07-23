import {LOAD} from 'redux-storage';
import * as actions from './actions';
import {
  TIME_SCALES,
  TIME_INTERVAL_DIRECTIONS,
  OVERVIEW_DIMENSIONS,
} from './constants';

import {
  differenceWith,
  evolve,
  assocPath,
  merge,
  values,
} from 'ramda';
import moment from 'moment';
import {idMap} from '../lib/state';

const initialState = {
  dimensions: {},
  timeScale: TIME_SCALES.WEEK,
  timeIntervalMarker: moment(),
};

function load(state) {
  const newDimensions = differenceWith(
    (a, b) => a.prop === b.prop,
    OVERVIEW_DIMENSIONS,
    values(state.dimensions),
  );

  return evolve(
    {dimensions: merge(idMap(newDimensions))},
    state
  );
}

function setTimeScale(timeScale, state) {
  return merge(state, {timeScale});
}

function changeTimeInterval(direction, state) {
  const {
    timeIntervalMarker,
    timeScale,
  } = state;

  let newMarker;
  switch(direction) {
    case TIME_INTERVAL_DIRECTIONS.NOW:
      newMarker = moment();

    case TIME_INTERVAL_DIRECTIONS.PREVIOUS:
      newMarker = moment(timeIntervalMarker).subtract(1, timeScale);

    case TIME_INTERVAL_DIRECTIONS.NEXT:
      newMarker = moment(timeIntervalMarker).add(1, timeScale);
  }

  return merge(state, {timeIntervalMarker: newMarker});
}

function toggleDimension({id, enable}, state) {
  return assocPath(
    ['dimensions', id, 'enabled'],
    enable,
    state
  );
}

export default function loggingReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD:
      return load(state);

    case actions.SET_TIME_SCALE:
      return setTimeScale(action.payload, state);

    case actions.CHANGE_TIME_INTERVAL:
      return changeTimeInterval(action.payload, state);

    case actions.TOGGLE_DIMENSION:
      return toggleDimension(action.payload, state);
  }

  return state;
}
